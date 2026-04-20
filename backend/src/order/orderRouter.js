const express = require("express");
const router = express.Router();

// Order controller functions
const { createCashOrder } = require("./orderController");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Create cash Order
// @access Private/User
router.post("/", requireLogIn, createCashOrder);

module.exports = router;