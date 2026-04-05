const CustomApiError = require("../utils/ApiError");
const { Review, Product } = require("../models/index");
const { checkExists } = require("../utils/helpers");

// @desc Find Reviews in db
const findReviews = async (filter, limit, page, sort) => {
  // pagination
  const limitPage = limit ? Number(limit) : 10;
  const pageNumber = page * 1 || 1;
  const skip = (pageNumber - 1) * limitPage;
  const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

  const filterObject = filter || {};

  const reviews = await Review
    .find(filterObject)
    .select("title ratings userId productId")
    .populate({ path: "userId", select: "userName _id" })
    .sort(sortBy)
    .skip(skip)
    .limit(limitPage);

  return {
    limit: limitPage,
    page: pageNumber,
    sort: sortBy,
    reviews
  };
};

// @desc Assert Review references in db
const assertReviewRefs = async (userId, productId) => {
  if (!productId) {
    throw CustomApiError.badRequest(`ProductId is required!`, "productId");
  }
  await checkExists(Product, productId, "productId");

  const review = await Review.exists({
    userId: userId,
    productId: productId,
  });

  if (review) {
    throw CustomApiError.badRequest("You already created a review before", "review");
  }
};

// @desc Assert Review references in db for Update and Delete
const assertReviewOwnership = async (reviewId, currentUser) => {
  const review = await Review.findById(reviewId)
    .select("_id userId productId");

  if (!review) {
    throw CustomApiError.notFound(`Review for this id: ${reviewId}`, "reviewId");
  }

  await checkExists(Product, review.productId, "productId");

  if (review.userId.toString() !== currentUser._id.toString()) {
    throw CustomApiError.forbidden("You are not allowed to update this review", "review");
  }

  return review;

};


module.exports = { findReviews, assertReviewRefs, assertReviewOwnership };