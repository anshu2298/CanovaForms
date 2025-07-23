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

module.exports = {
  getFormsByProjectId,
};
