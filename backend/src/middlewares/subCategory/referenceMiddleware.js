const { assertSubCategoryRefs, assertUpdateSubCategoryRefs } = require("../../services/subCategory");

// Middleware to check SubCategory references from SubCategorySchema
const checkSubCategoryRefs = async (req, res, next) => {
    await assertSubCategoryRefs(req.body.categoryId);
    return next();
};

// Middleware to check SubCategory references for Update from SubCategorySchema
const checkUpdateSubCategoryRefs = async (req, res, next) => {
    await assertUpdateSubCategoryRefs(req.body.categoryId);
    return next();
};

module.exports = { checkSubCategoryRefs, checkUpdateSubCategoryRefs };