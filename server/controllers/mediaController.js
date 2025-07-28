// controllers/mediaController.js
const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ message: "No file uploaded." });
    }

    const fileFormat = file.mimetype.startsWith("image")
      ? "image"
      : file.mimetype.startsWith("video")
      ? "video"
      : null;

    if (!fileFormat) {
      return res
        .status(400)
        .json({ message: "Unsupported file type." });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: fileFormat,
          folder: "form-media",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(file.buffer); // buffer comes from memoryStorage
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    res.status(500).json({ message: "Upload failed." });
  }
};

module.exports = { uploadFileToCloudinary };
