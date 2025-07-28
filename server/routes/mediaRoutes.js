const express = require("express");
const mediaRouter = express.Router();
const { upload } = require("../config/multer.js");
const {
  uploadFileToCloudinary,
} = require("../controllers/mediaController.js");

mediaRouter.post(
  "/upload",
  upload.single("file"),
  uploadFileToCloudinary
);
module.exports = mediaRouter;
