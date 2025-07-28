const mongoose = require("mongoose");

const TextBlockSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ["text"],
    default: "text",
  },
  data: {
    text: String,
  },
});

const QuestionBlockSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ["question"],
    default: "question",
  },
  data: {
    question: String,
    type: String,
    options: [String],
    required: {
      type: Boolean,
      default: false,
    },
  },
});

const ImageBlockSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ["image"],
    default: "image",
  },
  data: {
    url: String,
  },
});

const VideoBlockSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ["video"],
    default: "video",
  },
  data: {
    url: String,
  },
});

const SectionSchema = new mongoose.Schema({
  id: String,
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  backgroundOpacity: {
    type: Number,
    default: 100,
  },
  content: [
    {
      type: mongoose.Schema.Types.Mixed, // allows any of the block types
    },
  ],
});

const PageSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    default: "Untitled Page",
  },
  pageBackgroundColor: {
    type: String,
    default: "#ffffff",
  },
  pageBackgroundOpacity: {
    type: Number,
    default: 100,
  },
  sections: [SectionSchema],
});

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Form",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    pages: [PageSchema],
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
