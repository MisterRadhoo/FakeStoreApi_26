const express = require("express");
const router = express.Router();

const { register, login } = require("./authController");

// @desc Create new user in db
// @access Public
router.post("/register", register);

// @desc Authenticate current user
// @access Public
router.post("/login", login);



module.exports = router;