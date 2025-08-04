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

//get All Forms for a user.
const getAllForms = async (req, res) => {
  const userId = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ message: "Invalid userId " });
  }
  try {
    const forms = await Form.find({ user: userId });
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
      conditionalLogic: {
        conditions: [],
        truePageId: "",
        falsePageId: "",
      },
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

//Share a form.
const shareForm = async (req, res) => {
  const { formId } = req.params;
  const { userEmail } = req.body;

  const user = await User.findOneAndUpdate(
    { email: userEmail },
    {
      $addToSet: { sharedForms: formId },
    },
    { new: true }
  );

  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found" });
  }

  res
    .status(200)
    .json({ message: "Form shared successfully", user });
};

//get shared forms for a user.
const getSharedFormsForUser = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId)
      .populate("sharedForms")
      .select("sharedForms");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    res.status(200).json({ sharedForms: user.sharedForms });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching shared forms",
      error,
    });
  }
};

//rename a form.
const updateForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const { title } = req.body;

    const form = await Form.findByIdAndUpdate(
      formId,
      {
        ...(title && { title }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!form)
      return res
        .status(404)
        .json({ message: "Form not found" });

    return res.status(200).json(form);
  } catch (error) {
    console.log("Update Form Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
};

// SAVE a form
const saveForm = async (req, res) => {
  const { formId } = req.params;
  const updatedFormData = req.body;

  try {
    const existingForm = await Form.findById(formId);
    if (!existingForm) {
      return res
        .status(404)
        .json({ message: "Form not found" });
    }

    // Update top-level fields
    existingForm.title =
      updatedFormData.title || existingForm.title;

    // Update pages
    if (
      updatedFormData.pages &&
      updatedFormData.pages.length
    ) {
      existingForm.pages = existingForm.pages.map(
        (existingPage) => {
          const updatedPage = updatedFormData.pages.find(
            (p) => p._id === existingPage._id.toString()
          );

          if (!updatedPage) return existingPage;

          // Handle section merging logic
          const existingSections =
            existingPage.sections || [];
          const updatedSections =
            updatedPage.sections || [];
          const mergedSections = [];

          for (const updatedSection of updatedSections) {
            const match = existingSections.find(
              (s) =>
                s._id?.toString() === updatedSection._id ||
                s.id === updatedSection.id
            );

            if (match) {
              // Update existing section
              mergedSections.push({
                ...(match.toObject?.() || match),
                backgroundColor:
                  updatedSection.backgroundColor ??
                  match.backgroundColor,
                backgroundOpacity:
                  updatedSection.backgroundOpacity ??
                  match.backgroundOpacity,
                content:
                  updatedSection.content ?? match.content,
                id: match.id || match._id.toString(), // Ensure `id` is present
                _id: match._id,
              });
            } else {
              // Add new section with new _id and id
              const newSectionId =
                new mongoose.Types.ObjectId();
              mergedSections.push({
                _id: newSectionId,
                id: newSectionId.toString(),
                backgroundColor:
                  updatedSection.backgroundColor,
                backgroundOpacity:
                  updatedSection.backgroundOpacity,
                content: updatedSection.content,
              });
            }
          }

          return {
            ...existingPage.toObject(),
            name: updatedPage.name || existingPage.name,
            pageBackgroundColor:
              updatedPage.pageBackgroundColor ??
              existingPage.pageBackgroundColor,
            pageBackgroundOpacity:
              updatedPage.pageBackgroundOpacity ??
              existingPage.pageBackgroundOpacity,
            sections: mergedSections,
          };
        }
      );
    }

    await existingForm.save();

    res.status(200).json({
      message: "Form updated successfully",
      form: existingForm,
    });
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).json({
      message: "Server error while updating form",
    });
  }
};

// Publish a form
const publishForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const { access } = req.body;

    // Validate access value
    if (!["Anyone", "Restricted"].includes(access)) {
      return res.status(400).json({
        error:
          "Invalid access value. Must be 'Anyone' or 'Restricted'.",
      });
    }

    const form = await Form.findById(formId);
    if (!form) {
      return res
        .status(404)
        .json({ error: "Form not found" });
    }

    form.isPublished = true;
    form.access = access;

    await form.save();

    res.status(200).json({
      message: "Form published successfully",
      form,
    });
  } catch (error) {
    console.error("Error publishing form:", error);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
};

// ADD FORM TO A PROJECT
const assignFormToProject = async (req, res) => {
  try {
    const { formId } = req.params;
    const { projectId } = req.body;

    if (!projectId) {
      return res
        .status(400)
        .json({ error: "Project ID is required" });
    }

    const form = await Form.findById(formId);
    if (!form) {
      return res
        .status(404)
        .json({ error: "Form not found" });
    }

    form.project = projectId;
    await form.save();

    res.status(200).json({
      message: "Form assigned to project successfully",
    });
  } catch (error) {
    console.error(
      "Error assigning form to project:",
      error
    );
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
};

// ADD CONDITIONS
const saveCondition = async (req, res) => {
  const { formId } = req.params;
  const { conditions, truePageId, falsePageId } = req.body;

  if (!Array.isArray(conditions)) {
    return res
      .status(400)
      .json({ error: "Conditions must be an array." });
  }

  try {
    const form = await Form.findById(formId);

    if (!form) {
      return res
        .status(404)
        .json({ error: "Form not found." });
    }

    form.conditionalLogic = {
      conditions,
      truePageId,
      falsePageId,
    };

    await form.save();

    res.status(200).json({
      message: "Conditional logic saved successfully.",
      conditionalLogic: form.conditionalLogic,
    });
  } catch (err) {
    console.error("Error saving condition:", err);
    res
      .status(500)
      .json({ error: "Internal server error." });
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
  updateForm,
  saveForm,
  shareForm,
  getSharedFormsForUser,
  saveCondition,
  publishForm,
  assignFormToProject,
};
