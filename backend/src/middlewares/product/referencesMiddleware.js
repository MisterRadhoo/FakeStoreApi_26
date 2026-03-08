
const { assertProductRefs } = require("../../services/product");

// Middleware to check Product references from productSchema
const checkRefsProduct = async (req, res, next) => {

    await assertProductRefs(
        req.body.categoryId,
        req.body.subcategoriesIds,
        req.body.brandId
    );
    return next();
};


module.exports = checkRefsProduct;


