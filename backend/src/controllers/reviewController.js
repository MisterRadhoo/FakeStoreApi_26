const { Review } = require("../models/index");
const factory = require("./handlerFactory");
const { findReviews, findAllProductReviews } = require("../services/review");

// @desc Create Review
const createReview = factory.createOne(Review, "Review");
// @desc Get specific Review
const getReview = factory.getOne(Review, { path: "userId", select: "userName _id" }, "Review");
// @desc Update specific Review
const updateReview = factory.updateOne(Review, "Review");
// @desc Delete specific Review
const removeReview = factory.deleteOne(Review, "Review");
// @desc Get all Reviews
const getAllReviews = factory.getAll(Review);

// @desc Get list of Reviews on specific Product
const getListReviews = async (req, res) => {
    const response = await findReviews(
        req.filterObj,
        req.Query.limit,
        req.Query.page,
        req.Query.sort
    );

    return res.status(200).json({
        object: "reviews_list",
        limit: response.limit,
        page: response.page,
        sort: response.sort,
        count: response.reviews.length,
        list: response.reviews
    });
};

// Used for AI toxicity checker in frontend
// @desc Get all reviews from all products
const getAllProductReviews = async (req, res) => {

    const response = await findAllProductReviews(
        req.Query.limit,
        req.Query.page,
        req.Query.sort
    );

    return res.status(200).json({
        object: "all_product_reviews_list",
        limit: response.limit,
        page: response.page,
        sort: response.sort,
        count: response.reviews.length,
        list: response.reviews
    });
};


module.exports = {
    createReview,
    getReview,
    updateReview,
    removeReview,
    getAllReviews,
    getListReviews,
    getAllProductReviews
};