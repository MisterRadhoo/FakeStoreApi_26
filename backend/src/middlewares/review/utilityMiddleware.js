const { assertReviewRefs, assertReviewOwnership } = require("../../services/review");

// Middleware for nested route
// GET /api/products/:productId/reviews/list
const createFilterObj = (req, res, next) => {
    req.filterObj = req.params.productId ?
        { productId: req.params.productId } : {};
    next();
};


// Middleware for routes where you create Review/s for Product
const setProductIdAndUserIdToBody = (req, res, next) => {
    if (!req.body.productId) {
        req.body.productId = req.params.productId;
    }
    if (!req.body.userId) {
        req.body.userId = req.crUser._id.toString();  // user must be logged
    }
    next();
};


// Middleware to check Review references from ReviewSchema
const checkReviewRefs = async (req, res, next) => {
    await assertReviewRefs(req.crUser._id, req.body.productId);
    return next();
};

// Middleware to check Review references from reviwSchema for Update 
const checkReviewOwnership = async (req, res, next) => {
    await assertReviewOwnership(
        req.params.id,
        req.crUser
    );
    return next();
};


module.exports = {
    createFilterObj,
    setProductIdAndUserIdToBody,
    checkReviewRefs,
    checkReviewOwnership
};
