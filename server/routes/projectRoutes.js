const express = require("express");
const projectRouter = express.Router();
const { userAuth } = require("../middleware/userAuth.js");
const {
  createProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getProjectById,
  shareProject,
  getSharedProjectsForUser,
} = require("../controllers/projectController");

projectRouter.post("/create", userAuth, createProject);
projectRouter.delete(
  "/delete/:projectId",
  userAuth,
  deleteProject
);
projectRouter.patch("/share/:projectId", shareProject);
projectRouter.get(
  "/share/get-shared-projects",
  userAuth,
  getSharedProjectsForUser
);
projectRouter.patch(
  "/update/:projectId",
  userAuth,
  updateProject
);
projectRouter.get("/all", userAuth, getAllProjects);
projectRouter.get("/:projectId", userAuth, getProjectById);

module.exports = projectRouter;
