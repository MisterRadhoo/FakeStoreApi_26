const express = require("express");
const router = express.Router();

// BlackList controller function
const getBlackList = require("../controllers/blackListController");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get blacklisted Users
// @access Private/Admin
router.get("/", [requireLogIn, allowedTo("admin")], getBlackList);

module.exports = router;