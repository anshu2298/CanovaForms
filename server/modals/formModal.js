const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled Form" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null,
  },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
