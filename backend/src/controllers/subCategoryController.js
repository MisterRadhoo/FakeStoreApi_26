const { SubCategory } = require("../models/index");
const { findSubCategories } = require("../services/subCategory");
const factory = require("./handlerFactory");

// @desc Create SubCategory
const createSubCategory = factory.createOne(SubCategory, "SubCategory");
// @desc Get specific SubCategory
const getSubCategory = factory.getOne(SubCategory, { path: "categoryId", select: "name _id" }, "SubCategory");
// @desc Update specific SubCategory
const updateSubCategory = factory.updateOne(SubCategory, "SubCategory");
// @desc Delete specific SubCategory
const removeSubCategory = factory.deleteOne(SubCategory, "SubCategory");
// @desc Get all SubCategories
const getAllSubCategories = factory.getAll(SubCategory);

// @desc Get List of subCategories by same Category
// GET /api/categories/:categoryId/subcategories/list
const getListSubCategoriesByCategory = async (req, res) => {
    const result = await findSubCategories(
        req.params.categoryId,
        req.Query.limit,
        req.Query.page,
        req.Query.sort
    );

    return res.status(200).json({
        object: "subcategories_list",
        limit: result.limit,
        page: result.page,   // result come from req.page from url
        sort: result.sort,
        count: result.subCategories.length,
        subCategories: result.subCategories
    });
};


module.exports = {
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    removeSubCategory,
    getAllSubCategories,
    getListSubCategoriesByCategory
};