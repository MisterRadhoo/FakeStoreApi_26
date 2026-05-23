const express = require("express");
const router = express.Router();

// AI controller functions
const { analyzeReview } = require("./reviewAnalysisController");

// zod validation middlewares
const zBodyValidator = require("../middlewares/zodValidators/zBody");

// validators
const reviewIdSchema = require("./reviewIdSchema");

// permessions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc AI Review analysis 
// @access Private/Admin
router.post("/review-analysis",
    [requireLogIn, allowedTo("user", "admin")],
    zBodyValidator(reviewIdSchema),
    analyzeReview);

module.exports = router;