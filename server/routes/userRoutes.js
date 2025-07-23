const express = require("express");
const { userAuth } = require("../middleware/userAuth.js");
const { upload } = require("../config/multer.js");
const {
  getUserData,
  uploadProfilePicture,
  updateUserProfile,
} = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.get("/get-user", userAuth, getUserData);
userRouter.patch(
  "/update-profile",
  userAuth,
  updateUserProfile
);
userRouter.post(
  "/upload-profile-picture",
  userAuth,
  upload.single("profilePic"),
  uploadProfilePicture
);
module.exports = userRouter;
