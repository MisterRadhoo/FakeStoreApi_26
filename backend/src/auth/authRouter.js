const express = require("express");
const router = express.Router();
const zBodyValidator = require("../middlewares/zodValidators/zBody");

const { register, login, logout } = require("./authController");

// validators
const { zAuthRegisterSchema, zAuthLoginSchema } = require("./authValidatorSchema");

// rate limiter
const setLimiter = require("../middlewares/limiter/rateLimiter");

// @desc Create new user in db
// @access Public
router.post("/register", zBodyValidator(zAuthRegisterSchema), register);

// @desc Authenticate current user
// @access Public
router.post("/login", setLimiter({ limit: 100 }), zBodyValidator(zAuthLoginSchema), login);

// @desc Logout User
// @access Private/User
router.post("/logout", logout);


module.exports = router;