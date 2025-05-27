const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Resolve full path for 'uploads/videos'
const uploadPath = path.resolve(__dirname, "../uploads/videos");

// Ensure the uploads/videos directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Use resolved absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const videoUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".mp4") {
      return cb(new Error("Only .mp4 files are allowed"));
    }
    cb(null, true);
  },
});

module.exports = videoUpload;
