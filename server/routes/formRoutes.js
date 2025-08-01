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
  getSharedFormsForUser,
  shareForm,
} = require("../controllers/formController");

formsRouter.get("/all-forms", userAuth, getAllForms);
formsRouter.patch("/update-form/:formId", updateForm);
formsRouter.put("/save-form/:formId", saveForm);
formsRouter.get(
  "/:projectId",
  userAuth,
  getFormsByProjectId
);
//DELETE
formsRouter.delete("/delete/:formId", userAuth, deleteForm);
formsRouter.delete(
  "/:formId/delete-page/:pageId",
  deletePageFromForm
);
//---------------------------------------------------------------
// Share.
formsRouter.patch("/share-form/:formId", shareForm);
formsRouter.get(
  "/share/get-shared-forms",
  userAuth,
  getSharedFormsForUser
);
//----------------------------------------------------------------
formsRouter.post("/:formId/add-page", addPageToForm);
formsRouter.get("/get-form/:formId", getFormById);
formsRouter.post("/create-form", userAuth, createForm);

module.exports = formsRouter;
