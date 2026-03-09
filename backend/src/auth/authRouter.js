const express = require("express");
const router = express.Router();

const { register, login, logout } = require("./authController");

// @desc Create new user in db
// @access Public
router.post("/register", register);

// @desc Authenticate current user
// @access Public
router.post("/login", login);

// @desc Logout User
// @access Private/User
router.post("/logout", logout);




module.exports = router;