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
      type: mongoose.Schema.Types.Mixed,
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
    isPublished: { type: Boolean, default: false },
    access: {
      type: String,
      enum: ["Anyone", "Restricted"],
    },
    title: {
      type: String,
      default: "Untitled Form",
    },
    deployedUrl: "String",
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    pages: [PageSchema],
    conditionalLogic: {
      type: {
        conditions: [
          {
            questionId: String,
            questionType: String,
            label: String,
            answer: String,
          },
        ],
        truePageId: String,
        falsePageId: String,
      },
    },
  },
  { timestamps: true }
);

FormSchema.pre("save", function (next) {
  if (this.isNew && this.pages.length === 0) {
    const defaultSection = {
      id: new mongoose.Types.ObjectId().toString(),
      backgroundColor: "#ffffff",
      backgroundOpacity: 100,
      content: [],
    };

    const defaultPage = {
      id: new mongoose.Types.ObjectId().toString(),
      name: "Page 01",
      pageBackgroundColor: "#ffffff",
      pageBackgroundOpacity: 100,
      sections: [defaultSection],
    };

    this.pages.push(defaultPage);
  }

  next();
});

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
