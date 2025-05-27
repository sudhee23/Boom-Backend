const Purchase = require("../models/Purchase.js");
const User = require("../models/User.js");
const Video = require("../models/Video.js");

const handlePurchase = async (req, res) => {
  const userId = req.user.userId;
  const { videoId } = req.body;

  const video = await Video.findById(videoId);
  if (!video || video.price === 0)
    return res.status(400).json({ message: "Invalid video" });

  const alreadyBought = await Purchase.findOne({ userId, videoId });
  if (alreadyBought)
    return res.status(400).json({ message: "Already purchased" });

  const user = await User.findById(userId);
  if (user.wallet < video.price)
    return res.status(400).json({ message: "Insufficient funds" });

  user.wallet -= video.price;
  await user.save();

  await User.findByIdAndUpdate(video.creator, {
    $inc: { wallet: video.price },
  });

  const purchase = await Purchase.create({
    userId,
    videoId,
    creatorId: video.creator,
    amount: video.price,
  });

  res.status(200).json(purchase);
};

const checkPurchases = async (req, res) => {
  const userId = req.user.userId;
  const { ids } = req.body;

  const purchases = await Purchase.find({
    userId,
    videoId: { $in: ids },
  }).select("videoId");
  const result = purchases.reduce((acc, curr) => {
    acc[curr.videoId] = true;
    return acc;
  }, {});

  res.json(result);
};

module.exports = {checkPurchases,handlePurchase};
