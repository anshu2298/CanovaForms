const userModal = require("../modals/userModal.js");
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
      userData: {
        name: user.name,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUserData,
};
