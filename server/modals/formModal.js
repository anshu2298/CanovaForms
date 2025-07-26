const mongoose = require("mongoose");
const { Schema } = mongoose;

// Question Schema
const QuestionSchema = new Schema({
  type: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: [String],
  conditionalLogic: { type: Object, default: null },
});

// Section Schema
const SectionSchema = new Schema({
  sectionBackgroundColor: {
    type: String,
    default: "#ffffff",
  },
  sectionBackgroundOpacity: { type: Number, default: 100 },
  questions: [QuestionSchema],
});

// Page Schema
const PageSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Untitled Page",
  },
  pageBackgroundColor: { type: String, default: "#ffffff" },
  pageBackgroundOpacity: { type: Number, default: 100 },
  sections: {
    type: [SectionSchema],
    default: () => [
      {
        pageBackgroundColor: "#ffffff",
        pageBackgroundOpacity: 100,
        questions: [],
      },
    ],
  },
});

// Main Form Schema
const FormSchema = new Schema(
  {
    title: { type: String, default: "Untitled Form" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    pages: {
      type: [PageSchema],
      default: () => [
        {
          name: "Page 01",
          pageBackgroundColor: "#ffffff",
          pageBackgroundOpacity: 100,
          sections: [
            {
              sectionBackgroundColor: "#ffffff",
              sectionBackgroundOpacity: 100,
              questions: [],
            },
          ],
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);
