const Gift = require("../models/Gift");
const User = require("../models/User");
const Video = require("../models/Video");

exports.sendGift = async (req, res) => {
  const { amount, videoId } = req.body;
  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const creatorId = video.creator;
    const user = await User.findById(req.user.userId);
    if (user.wallet < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.wallet -= amount;
    await user.save();

    const gift = await Gift.create({
      fromUser: req.user.userId,
      toCreator: creatorId,
      videoId,
      amount,
    });

    res.status(201).json({ success: true, gift });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to send gift" });
  }
};
