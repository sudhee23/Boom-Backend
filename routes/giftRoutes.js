const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { sendGift } = require("../controllers/giftController");

router.post("/", protect, sendGift);

module.exports = router;
