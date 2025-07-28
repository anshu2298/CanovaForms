const express = require("express");
const formsRouter = express.Router();
const { userAuth } = require("../middleware/userAuth.js");
const {
  getFormsByProjectId,
  createForm,
  deleteForm,
  getFormById,
  addPageToForm,
  deletePageFromForm,
  getAllForms,
  updateForm,
  saveForm,
} = require("../controllers/formController");

formsRouter.get("/all-forms", getAllForms);
formsRouter.patch("/update-form/:formId", updateForm);
formsRouter.put("/save-form/:formId", saveForm);
formsRouter.get(
  "/:projectId",
  userAuth,
  getFormsByProjectId
);
formsRouter.delete(
  "/:formId/delete-page/:pageId",
  deletePageFromForm
);
formsRouter.post("/:formId/add-page", addPageToForm);
formsRouter.get("/get-form/:formId", getFormById);
formsRouter.post("/create-form", userAuth, createForm);
formsRouter.delete("/delete/:formId", userAuth, deleteForm);

module.exports = formsRouter;
