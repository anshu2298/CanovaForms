const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModal = require("../modals/userModal.js");
const transporter = require("../config/nodemailer.js");

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      status: "Failed",
      message: "Missing Details",
    });
  }
  try {
    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModal({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome", // Subject line
      text: `Welcome to MERN_AUTH your account has been created with email id: ${email}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    return res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: "Failed",
      message: "Email and Password are required",
    });
  }
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "No user found",
      });
    }

    const ismatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!ismatch) {
      return res.json({
        success: false,
        message: "invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production"
          ? true
          : false,
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successfull",
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// Logout a user
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production"
          ? true
          : false,
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "strict",
    });

    return res.json({
      success: true,
      message: "Logged Out!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// Send verification OTP to user
const sendVarifiedOtp = async (req, res) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res.json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await userModal.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.json({
        success: false,
        message: "Account already verified",
      });
    }

    const otp = String(
      Math.floor(100000 + Math.random() * 900000)
    );
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP", // Subject line
      text: `Your otp is: ${otp}. Verify your account using this otp`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Verfication email send to user",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// Verify user email with OTP
const verifyEmail = async (req, res) => {
  const userId = req.user;
  const { otp } = req.body;
  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "Missisng Details",
    });
  }
  try {
    const user = await userModal.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    if (user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid Otp",
      });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Otp Expired",
      });
    }
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();
    return res.json({
      success: true,
      message: "Account Verified",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// Check if user is authenticated
const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// Send OTP for password reset
const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const otp = String(
      Math.floor(100000 + Math.random() * 900000)
    );
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Otp for password reset",
      text: `Your otp is: ${otp}. Reset your password using this otp`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      return res.json({
        success: false,
        message: "Failed to send email. Try again later.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Password reset otp send to user",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// Verify the OTP for password reset
const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({
      success: false,
      message: "Missing email or OTP",
    });
  }

  try {
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }

    // OTP is valid
    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// Reset user password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.json({
      success: false,
      message: "Missing email or password",
    });
  }

  try {
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;
    user.resetOtp = ""; // Clear OTP fields
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
  logout,
  sendVarifiedOtp,
  resetPassword,
  verifyResetOtp,
};
