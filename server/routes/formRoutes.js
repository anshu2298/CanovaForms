const express = require("express");
const formsRouter = express.Router();
const { userAuth } = require("../middleware/userAuth.js");
const {
  getFormsByProjectId,
  createForm,
  deleteForm,
  getFormById,
} = require("../controllers/formController");

formsRouter.get(
  "/:projectId",
  userAuth,
  getFormsByProjectId
);

formsRouter.get("/get-form/:formId", getFormById);
formsRouter.post("/create-form", userAuth, createForm);
formsRouter.delete("/delete/:formId", userAuth, deleteForm);

module.exports = formsRouter;
