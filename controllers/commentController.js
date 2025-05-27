const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = await Comment.create({
      text,
      userId: req.user.userId,
      videoId: req.params.videoId,
    });
    const populatedComment = await newComment.populate("userId", "username");
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};
