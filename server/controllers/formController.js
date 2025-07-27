const Project = require("../modals/projectModal");
const User = require("../modals/userModal");
const Form = require("../modals/formModal");
const mongoose = require("mongoose");

// get forms by project ID
const getFormsByProjectId = async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ message: "Invalid project ID" });
  }

  try {
    const forms = await Form.find({ project: projectId });
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
};

//get standAlone Forms.
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
};

// get form by formId
const getFormById = async (req, res) => {
  const { formId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(formId)) {
    return res
      .status(400)
      .json({ message: "Invalid form ID" });
  }
  try {
    const form = await Form.findById(formId);

    if (!form) {
      return res
        .status(404)
        .json({ message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
};

//create a form
const createForm = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { projectId, formName } = req.body;
    const userId = req.user;

    const newForm = await Form.create({
      ...(formName && { title: formName }),
      project: projectId || null,
      user: userId,
    });

    if (projectId) {
      await Project.findByIdAndUpdate(projectId, {
        $push: { forms: newForm._id },
      });
    }

    await User.findByIdAndUpdate(userId, {
      $push: {
        forms: newForm._id,
      },
    });
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json(newForm);
  } catch (error) {
    console.error("Create Form Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
};

// Add a new page to a form
const addPageToForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res
        .status(404)
        .json({ message: "Form not found" });
    }

    const newPageNumber = form.pages.length + 1;

    const newPage = {
      name: `Page ${String(newPageNumber).padStart(
        2,
        "0"
      )}`,
      pageBackgroundColor: "#ffffff",
      pageBackgroundOpacity: 100,
      sections: [],
    };

    form.pages.push(newPage);
    await form.save();

    // Return the newly added page
    res.status(200).json({
      message: "Page added successfully",
      newPage: form.pages[form.pages.length - 1], // last added
    });
  } catch (err) {
    console.error("Error adding page:", err);
    res
      .status(500)
      .json({ message: "Server error while adding page" });
  }
};

//Delete a page from a form
const deletePageFromForm = async (req, res) => {
  const { formId, pageId } = req.params;

  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res
        .status(404)
        .json({ message: "Form not found" });
    }

    const initialLength = form.pages.length;
    form.pages = form.pages.filter(
      (page) => page._id.toString() !== pageId
    );

    if (form.pages.length === initialLength) {
      return res
        .status(404)
        .json({ message: "Page not found in form" });
    }

    await form.save();
    res.status(200).json({
      message: "Page deleted successfully",
      updatedForm: form,
    });
  } catch (err) {
    console.error("Error deleting page:", err);
    res.status(500).json({
      message: "Server error while deleting page",
    });
  }
};

//delete a form
const deleteForm = async (req, res) => {
  const { formId } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res
        .status(400)
        .json({ message: "Invalid form ID" });
    }

    const form = await Form.findById(formId);
    if (!form) {
      return res
        .status(404)
        .json({ message: "Form not found" });
    }

    const { project, user } = form;

    // Delete the form
    await Form.findByIdAndDelete(formId);

    // Remove reference from project if applicable
    if (project) {
      await Project.findByIdAndUpdate(project, {
        $pull: { forms: formId },
      });
    }

    // Remove reference from user
    if (user) {
      await User.findByIdAndUpdate(user, {
        $pull: { forms: formId },
      });
    }

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Form deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Delete Form Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getFormsByProjectId,
  createForm,
  deleteForm,
  getFormById,
  addPageToForm,
  deletePageFromForm,
  getAllForms,
};
