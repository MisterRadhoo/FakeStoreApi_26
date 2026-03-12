const CustomApiError = require("../../utils/ApiError");
const { assertReviewRefs } = require("../../services/review");

// Middleware to check Review references from ReviewSchema
const checkReviewRefs = async (req, res, next) => {
    // check for user to be authenticated
    if (!req.crUser || !req.crUser._id) {
        return next(CustomApiError.unauthorized("You must be logged in!"));
    }
    await assertReviewRefs(req.crUser._id, req.body.productId);

    return next();
};

module.exports = checkReviewRefs;