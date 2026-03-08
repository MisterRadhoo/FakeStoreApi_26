const factory = require("./handlerFactory");
const { Category } = require("../models/index");

// @desc Create Category
const createCategory = factory.createOne(Category, "Category");
// @desc Get specific Category
const getCategory = factory.getOne(Category, null, "Category");
// @desc Update specific Category
const updateCategory = factory.updateOne(Category, "Category");
// @desc Delete specific Category
const removeCategory = factory.deleteOne(Category, "Category");
// @desc Get all Categories
const getAllCategories = factory.getAll(Category);


module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    removeCategory,
    getAllCategories,
};