const Video = require("../models/Video");

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoType, videoURL, price } = req.body;
    const videoData = {
      creator: req.user.userId,
      title,
      description,
      videoType,
    };

    if (videoType === "short") {
      if (!req.file) return res.status(400).json({ message: "Video file is required" });
      videoData.videoFile = req.file.filename;

    } else {
      if (!videoURL) return res.status(400).json({ message: "Video URL is required" });
      videoData.videoURL = videoURL;
      videoData.price = price || 0;
    }

    const newVideo = await Video.create(videoData);
    res.status(201).json({ data: newVideo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/videoController.j

exports.getVideoFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("creator", "name");

    const formattedVideos = videos.map((video) => ({
      _id: video._id,
      title: video.title,
      videoType: video.videoType,
      creator: video.creator.name,
      thumbnail: video.thumbnail || "", // optional
      price: video.price,
      videoURL: video.videoURL,
      videoFile: video.videoFile,
      createdAt: video.createdAt,
      description: video.description,
    }));

    res.json({ success: true, videos: formattedVideos });
  } catch (error) {
    res.status(500).json({ error: "Failed to load feed." });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("creator", "name");
    if (!video) return res.status(404).json({ error: "Video not found" });

    res.json({
      _id: video._id,
      title: video.title,
      videoType: video.videoType,
      creator: video.creator.name,
      thumbnail: video.thumbnail || "",
      price: video.price,
      videoURL: video.videoURL,
      videoFile: video.videoFile,
      createdAt: video.createdAt,
      description: video.description,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

