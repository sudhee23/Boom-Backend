// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes.js")
const commentRoutes = require("./routes/commentRoutes.js")
const giftRoutes = require("./routes/giftRoutes.js")
const purchaseRoutes = require("./routes/purchaseRoutes.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/testDB";
app.use('/uploads', cors(), express.static('uploads', {
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video",videoRoutes);
app.use("/api/comment",commentRoutes);
app.use("/api/gift",giftRoutes);
app.use("/api/purchase",purchaseRoutes);
// Add other routes as you create them

// Connect DB & Start Server
mongoose.connect(MONGO_URI, {
})
.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
