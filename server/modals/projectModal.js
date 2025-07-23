const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  forms: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
