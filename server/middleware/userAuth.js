const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  let token =
    req.cookies.token ||
    req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized login again",
    });
  }
  try {
    const tokenDecoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    if (!tokenDecoded || !tokenDecoded.id) {
      return res.json({
        success: false,
        message: "Not authorized. Please login again",
      });
    }
    req.user = tokenDecoded.id;

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { userAuth };
