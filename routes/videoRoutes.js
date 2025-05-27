const express = require("express");
const router = express.Router();
const { uploadVideo,getVideoFeed,getVideoById } = require("../controllers/videoController");
const videoUpload  = require("../middleware/multerConfig");
const { protect } = require("../middleware/auth.middleware");

router.post("/upload", protect, videoUpload.single("videoFile"), uploadVideo);
router.get("/feed", getVideoFeed);
router.get('/:id', getVideoById);

module.exports = router;