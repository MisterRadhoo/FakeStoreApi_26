const express = require("express");
const router = express.Router({ mergeParams: true });

// Review middlewares
const {
    createFilterObj,
    setProductIdAndUserIdToBody,
    checkReviewRefs
} = require("../middlewares/review/utilityMiddleware");

// Review controller functions
const {
    createReview,
    getReview,
    updateReview,
    removeReview,
    getAllReviews,
    getListReviews
} = require("../controllers/reviewController");

// zod validation middlewares
const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const zBodyValidator = require("../middlewares/zodValidators/zBody");
const zParamValidator = require("../middlewares/zodValidators/zParams");

// validators
const zPaginationSchema = require("../validators/zPagination");
const idReviewSchema = require("../validators/review/idReview");
const zCreateReviewSchema = require("../validators/review/createReviewSchema");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get all Reviews
// @access Public
router.get("/", getAllReviews);

// @desc Get list of Reviews
// @access Public
router.get("/list", zQueryValidator(zPaginationSchema), createFilterObj, getListReviews);

// @desc Get specific Review
// @access Public
router.get("/:id", zParamValidator(idReviewSchema), getReview);

// @desc Create Review
// @access Private/Protected/User
router.post("/",
    [requireLogIn, allowedTo("user")],
    setProductIdAndUserIdToBody,
    zBodyValidator(zCreateReviewSchema),
    checkReviewRefs,
    createReview);

// @desc Update specific Review
// @access Private/Protected
router.put("/:id",
    [requireLogIn, allowedTo("user")],
    zParamValidator(idReviewSchema),
    updateReview);

// @desc Delete specific Review
// @access Private/Protect/Admin
router.delete("/:id",
    [requireLogIn, allowedTo("user", "admin")],
    zParamValidator(idReviewSchema),
    removeReview);

module.exports = router;