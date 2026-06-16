const CustomApiError = require("../utils/ApiError");
const { Review, Product, BlackList } = require("../models/index");
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
    .select("title ratings userId productId aiStatus createdAt updatedAt")
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

// Used for AI toxicity checker in frontend
// @desc Find all Reviews from all products
const findAllProductReviews = async (limit, page, sort) => {
  // pagination
  const limitPage = limit ? Number(limit) : 90;
  const pageNumber = page * 1 || 1;
  const skip = (pageNumber - 1) * limitPage;
  const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

  const reviews = await Review
    .find({})
    .select("title ratings userId productId aiStatus toxicityStatus createdAt updatedAt")
    .populate({ path: "userId", select: "userName _id" })
    .populate({ path: "productId", select: "title _id" })
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

// constant for toxicity threshold
const TOXICITY_BLACKLIST_THRESHOLD = 0.75;

// @desc Add Toxic label in BlackList if toxicity score is >= 75%
const addToxicLabelToBlackList = async (review, toxicityStatus) => {
  const toxicityScore = Number(toxicityStatus.confidence) || 0;

  if (toxicityStatus.label !== "Toxic" || toxicityScore < TOXICITY_BLACKLIST_THRESHOLD) {
    return null;
  }

  return BlackList.findOneAndUpdate(
    {
      userId: review.userId,
      reviewId: review._id,
      label: "Toxic"
    },
    {
      userId: review.userId,
      reviewId: review._id,
      label: "Toxic",
      reason: "AI toxicity score is greater than or equal to 0.75",
      aiScore: toxicityScore,
      reviewTextSnapshot: review.title
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  );
};

// @desc Save toxicity status on Review
const saveReviewToxicityStatus = async (reviewId, toxicityStatus) => {
  const updateReviewStatus = await Review.updateOne(
    { _id: reviewId },
    {
      $set: {
        toxicityStatus: {
          label: toxicityStatus.label,
          confidence: toxicityStatus.confidence,
          primaryCategory: toxicityStatus.primaryCategory,
          categories: toxicityStatus.categories || [],
          analyzedAt: new Date()
        }
      }
    },
    {
      runValidators: true,
      timestamps: false
    }
  );

  if (!updateReviewStatus.matchedCount) {
    throw CustomApiError.notFound(`Review with id: ${reviewId}`, "reviewId");
  }

  const reviewBlackList = await Review.findById(reviewId).select("title userId");

  // Add Toxic label in BlackList if toxicity rule is matched
  await addToxicLabelToBlackList(reviewBlackList, toxicityStatus);

  return Review.findById(reviewId)
    .select("title ratings userId productId toxicityStatus createdAt updatedAt")
    .populate({ path: "userId", select: "userName _id" })
    .populate({ path: "productId", select: "title _id" });
};

module.exports = {
  findReviews,
  assertReviewRefs,
  assertReviewOwnership,
  findAllProductReviews,
  saveReviewToxicityStatus
};