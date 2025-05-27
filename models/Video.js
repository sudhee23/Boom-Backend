const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  videoType: { type: String, enum: ["short", "long"], required: true },
  videoFile: { type: String }, // local path
  videoURL: { type: String }, // YouTube/Vimeo link
  price: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);