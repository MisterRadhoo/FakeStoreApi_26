const express = require("express");
const router = express.Router();

// User controller functions
const { } = require("./userController");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");



module.exports = router;