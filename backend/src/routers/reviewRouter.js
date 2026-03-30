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

// limiter
const setLimiter = require("../middlewares/limiter/rateLimiter");

// @desc Get all Reviews
// @access Public
router.get("/", setLimiter({ limit: 15 }), getAllReviews);

// @desc Get list of Reviews on specific Product
// @access Public
router.get("/list", setLimiter({ limit: 15 }), zQueryValidator(zPaginationSchema), createFilterObj, getListReviews);

// @desc Get specific Review
// @access Public
router.get("/:id", zParamValidator(idReviewSchema), getReview);

// @desc Create Review
// @access Private/User
router.post("/",
    [requireLogIn, allowedTo("user")],
    setLimiter({ limit: 15 }),
    setProductIdAndUserIdToBody,
    zBodyValidator(zCreateReviewSchema),
    checkReviewRefs,
    createReview);

// @desc Update specific Review
// @access Private/User
router.put("/:id",
    [requireLogIn, allowedTo("user")],
    setLimiter({ limit: 15 }),
    zParamValidator(idReviewSchema),
    updateReview);

// @desc Delete specific Review
// @access Private/User/Admin
router.delete("/:id",
    [requireLogIn, allowedTo("user", "admin")],
    setLimiter({ limit: 15 }),
    zParamValidator(idReviewSchema),
    removeReview);

module.exports = router;