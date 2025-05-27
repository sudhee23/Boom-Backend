// routes/userRoute.js
const express = require("express");
const { getUserDetails, updateUser,getMyProfile, getMyPurchases, getMyGifts } = require("../controllers/userController");
const { protect } = require("../middleware/auth.middleware");
const { validateUserUpdate } = require("../middleware/validators");
const multer = require("multer");

const router = express.Router();

// GET /api/user - fetches details for the logged-in user
router.get("/", protect, getUserDetails);

router.get("/me", protect, getMyProfile);
router.get("/purchases", protect, getMyPurchases);
router.get("/gifts", protect, getMyGifts);

// Use multer memory storage so that file is available in req.file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// PATCH /api/user - update user profile with image upload
router.patch("/", protect, validateUserUpdate, upload.single("profilePhoto"), updateUser);

module.exports = router;
