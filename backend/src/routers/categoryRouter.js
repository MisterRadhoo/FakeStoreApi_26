const express = require("express");
const router = express.Router({ mergeParams: true });

// Category middlewares
const categoryById = require("../middlewares/category/paramByIdMiddleware");
const slugifyCategory = require("../middlewares/category/slugifyCategory");

// Routers for Nested Route
const subCategoryRouter = require("./subCategoryRouter");
const productsRouter = require("./productsRouter");

// Category controller functions
const {
    createCategory,
    getCategory,
    updateCategory,
    removeCategory,
    getAllCategories
} = require("../controllers/categoryController");

// validators


// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

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
router.post("/", [requireLogIn, allowedTo("admin")], slugifyCategory, createCategory);

// @desc Update specific Category
// @access Private/Admin
router.put("/:id", [requireLogIn, allowedTo("admin")], slugifyCategory, updateCategory);

// @desc Delete specific Category
// @access Private/Admin
router.delete("/:id", [requireLogIn, allowedTo("admin")], removeCategory);


module.exports = router;
