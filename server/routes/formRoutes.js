const express = require("express");
const formsRouter = express.Router();
const { userAuth } = require("../middleware/userAuth.js");
const {
  getFormsByProjectId,
  createForm,
  deleteForm,
} = require("../controllers/formController");

formsRouter.get(
  "/:projectId",
  userAuth,
  getFormsByProjectId
);
formsRouter.post("/create-form", userAuth, createForm);
formsRouter.delete("/delete/:formId", userAuth, deleteForm);

module.exports = formsRouter;
