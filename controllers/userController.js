// controllers/userController.js
const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Gift = require("../models/Gift");
const Video = require("../models/Video");

  // get user
exports.getUserDetails = async (req, res, next) => {
  try {
    // `req.user` is populated by the protect middleware.
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// Update logged-in user's profile details (with image pre-processing)
exports.updateUser = async (req, res, next) => {
  try {
    // Get userId from protect middleware
    const userId = req.user.userId;
    let updateData = { ...req.body };

    

    // Update the user document with provided fields
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("name email");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};


exports.getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select("username email wallet name");
  res.json(user);
};

exports.getMyPurchases = async (req, res) => {
  const purchases = await Purchase.find({ userId: req.user.userId }).populate("videoId");
  const videoDetails = purchases.map((p) => ({
    _id: p.videoId,
    title: p.videoId.title,
    creator: p.videoId.creator || "Unknown",
  }));
  res.json(videoDetails);
};

exports.getMyGifts = async (req, res) => {
  const gifts = await Gift.find({ fromUser: req.user.userId }).populate("videoId");
  const result = gifts.map((g) => ({
    _id: g._id,
    amount: g.amount,
    creatorName: g.videoId?.creator || "Unknown",
    videoTitle: g.videoId?.title || "Deleted Video",
  }));
  res.json(result);
};

