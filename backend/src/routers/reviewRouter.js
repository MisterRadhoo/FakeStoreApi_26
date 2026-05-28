const express = require("express");
const router = express.Router({ mergeParams: true });

// Review middlewares
const {
    createFilterObj,
    setProductIdAndUserIdToBody,
    checkReviewRefs,
    checkReviewOwnership
} = require("../middlewares/review/utilityMiddleware");

// Review controller functions
const {
    createReview,
    getReview,
    updateReview,
    removeReview,
    getAllReviews,
    getListReviews,
    getAllProductReviews,
    updateReviewToxicityStatus
} = require("../controllers/reviewController");

// zod validation middlewares
const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const zBodyValidator = require("../middlewares/zodValidators/zBody");
const zParamValidator = require("../middlewares/zodValidators/zParams");

// validators
const zPaginationSchema = require("../validators/zPagination");
const idReviewSchema = require("../validators/review/idReview");
const zCreateReviewSchema = require("../validators/review/createReviewSchema");
const zUpdateReviewSchema = require("../validators/review/updateReviewSchema");
const zApiFeatures = require("../validators/zApiFeatures");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// limiter
const setLimiter = require("../middlewares/limiter/rateLimiter");

// @desc Get all Reviews
// @access Public
router.get("/",
    setLimiter({ limit: 300 }),
    zQueryValidator(zApiFeatures),
    getAllReviews);

// @desc Get all reviews from Products
// @access Public
router.get("/all-products",
    setLimiter({ limit: 199 }),
    [requireLogIn, allowedTo("user", "admin")],
    zQueryValidator(zPaginationSchema),
    getAllProductReviews);

// @desc Get list of Reviews on specific Product
// @access Public
router.get("/list",
    setLimiter({ limit: 199 }),
    zQueryValidator(zPaginationSchema),
    createFilterObj,
    getListReviews);

// @desc Get specific Review
// @access Public
router.get("/:id", zParamValidator(idReviewSchema), getReview);

// @desc Update specific Review toxicity status
// @desc Private/User/Admin
router.patch("/:id/toxicity-status",
    [requireLogIn, allowedTo("user", "admin")],
    setLimiter({ limit: 199 }),
    zParamValidator(idReviewSchema),
    updateReviewToxicityStatus);

// @desc Create Review
// @access Private/User
router.post("/",
    [requireLogIn, allowedTo("user")],
    setLimiter({ limit: 399 }),
    setProductIdAndUserIdToBody,
    zBodyValidator(zCreateReviewSchema),
    checkReviewRefs,
    createReview);

// @desc Update specific Review
// @access Private/User
router.patch("/:id",
    [requireLogIn, allowedTo("user")],
    setLimiter({ limit: 199 }),
    zParamValidator(idReviewSchema),
    zBodyValidator(zUpdateReviewSchema),
    checkReviewOwnership,
    updateReview);

// @desc Delete specific Review
// @access Private/User/Admin
router.delete("/:id",
    [requireLogIn, allowedTo("user", "admin")],
    setLimiter({ limit: 399 }),
    zParamValidator(idReviewSchema),
    checkReviewOwnership,
    removeReview);

module.exports = router;