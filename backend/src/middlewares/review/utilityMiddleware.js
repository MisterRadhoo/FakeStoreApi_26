
// Middleware for nested route
// GET /api/products/:productId/reviews
const createFilterObj = (req, res, next) => {
    req.filterObj = req.params.productId ?
        { productId: req.params.productId } : {};
    next();
};


// Middleware for routes where you create Review/s for Product
const setProductIdAndUserIdToBody = async (req, res, next) => {
    if (!req.body.productId) {
        req.body.productId = req.params.productId;
    }
    if (!req.body.userId) {
        req.body.userId = req.crUser._id;  // user must be logged
    }
    next();
};

module.exports = { createFilterObj, setProductIdAndUserIdToBody };
