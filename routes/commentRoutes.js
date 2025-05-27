const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { addComment, getComments } = require("../controllers/commentController");
const { validateObjectId } = require("../middleware/validators");

router.post("/:videoId", protect, validateObjectId("videoId"), addComment);
router.get("/:videoId", validateObjectId("videoId"), getComments);

module.exports = router;
