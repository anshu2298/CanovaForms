const Project = require("../modals/projectModal");
const User = require("../modals/userModal");
const Form = require("../modals/formModal");
const mongoose = require("mongoose");
//Create Project

const createProject = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { projectName, formName } = req.body;
    const userId = req.user; // assuming req.user contains the logged-in user ID

    if (!projectName || !formName)
      return res.status(400).json({
        message: "Project name and form name are required",
      });

    const newProject = await Project.create({
      name: projectName,
      user: userId,
    });

    const newForm = await Form.create({
      title: formName,
      project: newProject._id,
      user: userId,
    });

    await Project.findByIdAndUpdate(newProject._id, {
      $push: { forms: newForm._id },
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        projects: newProject._id,
        forms: newForm._id,
      },
    });
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json(newProject);
  } catch (error) {
    console.error("Create Project Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        ...(name && { name }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!project)
      return res
        .status(404)
        .json({ message: "Project not found" });

    return res.status(200).json(project);
  } catch (error) {
    console.error("Update Project Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(
      projectId
    );
    if (!project)
      return res
        .status(404)
        .json({ message: "Project not found" });

    // Optional: delete all forms linked to this project
    // await Form.deleteMany({ project: projectId });

    // await project.remove();

    return res
      .status(200)
      .json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
};

// Get All Projects for a User
const getAllProjects = async (req, res) => {
  try {
    const userId = req.user;

    const projects = await Project.find({
      user: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json(projects);
  } catch (error) {
    console.error("Get All Projects Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
};

// Get Project by ID
const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("forms") // populate form details
      .exec();

    if (!project)
      return res
        .status(404)
        .json({ message: "Project not found" });

    return res.status(200).json(project);
  } catch (error) {
    console.error("Get Project by ID Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
};
