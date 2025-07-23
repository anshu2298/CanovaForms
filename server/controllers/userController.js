const userModal = require("../modals/userModal.js");
const cloudinary = require("cloudinary");

const getUserData = async (req, res) => {
  try {
    const userId = req.user;
    const user = await userModal.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user; // coming from auth middleware
    const imageFile = req.file; // make sure multer or other middleware is handling req.file

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Get user from DB
    const user = await userModal.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      imageFile.path,
      {
        folder: "profile_pictures", // optional, just keeps Cloudinary organized
        resource_type: "image",
      }
    );

    // Save URL to user model (optional)
    user.profileImageUrl = result.secure_url;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      profileImageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(
      "Error uploading profile picture:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Server error while uploading image",
    });
  }
};

// Update user profile information
const updateUserProfile = async (req, res) => {
  const userId = req.user; // from auth middleware
  const { name, email, phoneNumber, location } = req.body;

  try {
    const updatedUser = await userModal.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(phoneNumber && { phoneNumber }),
        ...(location && { location }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { updateUserProfile };

module.exports = {
  getUserData,
  uploadProfilePicture,
  updateUserProfile,
};
