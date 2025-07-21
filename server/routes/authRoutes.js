const express = require("express");
const {
  register,
  login,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
  logout,
  sendVarifiedOtp,
  verifyResetOtp,
} = require("../controllers/authController.js");
const { userAuth } = require("../middleware/userAuth.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post(
  "/send-verify-otp",
  userAuth,
  sendVarifiedOtp
);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-password-otp", sendResetOtp);
authRouter.post("/verify-reset-otp", verifyResetOtp);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;
