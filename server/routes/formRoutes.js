const express = require("express");
const formsRouter = express.Router();
const { userAuth } = require("../middleware/userAuth.js");
const {
  getFormsByProjectId,
} = require("../controllers/formController");

formsRouter.get(
  "/:projectId",
  userAuth,
  getFormsByProjectId
);
module.exports = formsRouter;
