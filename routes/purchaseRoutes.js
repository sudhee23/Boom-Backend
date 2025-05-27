const express = require('express');
const { handlePurchase, checkPurchases } = require('../controllers/purchaseController.js');
const { protect } = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/buy', protect, handlePurchase);
router.post('/check', protect, checkPurchases);

module.exports = router;
