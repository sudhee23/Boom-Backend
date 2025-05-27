const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Purchase', purchaseSchema);
