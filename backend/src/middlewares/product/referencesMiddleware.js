const { assertProductRefs, assertProductRefsForUpdate } = require("../../services/product");

// Middleware to check Product references from productSchema
const checkProductRefs = async (req, res, next) => {

    await assertProductRefs(
        req.body.categoryId,
        req.body.subcategoriesIds,
        req.body.brandId
    );
    return next();
};

// Middleware to check Product references from productSchema for Update 
const checkProductRefsForUpdate = async (req, res, next) => {
    await assertProductRefsForUpdate(
        req.params.id,
        req.body
    );
    return next();
};



module.exports = { checkProductRefs, checkProductRefsForUpdate };


