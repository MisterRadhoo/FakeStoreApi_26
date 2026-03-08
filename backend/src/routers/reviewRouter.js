const express = require("express");
const router = express.Router({ mergeParams: true });

const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const { createFilterObj, setProductIdAndUserIdToBody } = require("../middlewares/review/utilityMiddleware");


const {
    createReview,
    getReview,
    updateReview,
    removeReview,
    getAllReviews,
    getListReviews
} = require("../controllers/reviewController");

// validators
const zPaginationSchema = require("../validators/zPagination");

// @desc Get all Reviews
// @access Public
router.get("/", getAllReviews);

// @desc Get list of Reviews
// @access Public
router.get("/list", zQueryValidator(zPaginationSchema), createFilterObj, getListReviews);

// @desc Get specific Review
// @access Public
router.get("/:id", getReview);

// @desc Create Review
// @access Private/Protected
router.post("/", /*setProductIdAndUserIdToBody,*/ createReview);

// @desc Update Review
// @access Private/Protected
router.put("/:id", updateReview);

// @desc Delete Review
// @access Private/Protect/Admin
router.delete("/:id", removeReview);

module.exports = router;