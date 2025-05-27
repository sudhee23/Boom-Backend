const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gift", giftSchema);
