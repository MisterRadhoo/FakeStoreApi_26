const express = require("express");
const router = express.Router({ mergeParams: true });
const categoryById = require("../middlewares/category/paramByIdMiddleware");
const slugifyCategory = require("../middlewares/category/slugifyCategory");

// Routers for Nested Route
const subCategoryRouter = require("./subCategoryRouter");
const productsRouter = require("./productsRouter");

const {
    createCategory,
    getCategory,
    updateCategory,
    removeCategory,
    getAllCategories
} = require("../controllers/categoryController");

// Param for Nested Route
router.param("categoryId", categoryById);

// @desc Get all Products by Category
router.use("/:categoryId/products", productsRouter);

// @desc Get all Subcategories for specific Category (Nested Route)
// @desc Create Subcategory on Category (Nested Route)
router.use("/:categoryId/subcategories", subCategoryRouter);

// @desc Get all Categories
// @access Public
router.get("/", getAllCategories);

// @desc Get specific Category
// @access Public
router.get("/:id", getCategory);

// @desc Create a Category
// @access Private/Admin
router.post("/", slugifyCategory, createCategory);

// @desc Update specific Category
// @access Private/Admin
router.put("/:id", slugifyCategory, updateCategory);

// @desc Delete specific Category
// @access Private/Admin
router.delete("/:id", removeCategory);


module.exports = router;
