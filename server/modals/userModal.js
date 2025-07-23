const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
  profileImageUrl: { type: String, default: null },
  phoneNumber: { type: Number },
  location: { type: String },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  forms: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  ],
});

const userModal =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

module.exports = userModal;
