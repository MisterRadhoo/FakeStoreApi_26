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

// zod validation middlewares
const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const zParamsValidator = require("../middlewares/zodValidators/zParams");
const zBodyValidator = require("../middlewares/zodValidators/zBody");

// validators
const idCategorySchema = require("../validators/category/idCategory");
const { zCreateCategorySchema, zUpdateCategorySchema } = require("../validators/category/createCategorySchema");


// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// limiter
const setLimiter = require("../middlewares/limiter/rateLimiter");

// Param for Nested Route
router.param("categoryId", categoryById);

// @desc Get all Products by Category
router.use("/:categoryId/products", productsRouter);

// @desc Get all Subcategories for specific Category (Nested Route)
// @desc Create Subcategory on Category (Nested Route)
router.use("/:categoryId/subcategories", subCategoryRouter);

// @desc Get all Categories
// @access Public
router.get("/", setLimiter({ limit: 30 }), getAllCategories);

// @desc Get specific Category
// @access Public
router.get("/:id", zParamsValidator(idCategorySchema), getCategory);

// @desc Create a Category
// @access Private/Admin
router.post("/",
    [requireLogIn, allowedTo("admin")],
    zBodyValidator(zCreateCategorySchema),
    slugifyCategory,
    createCategory);

// @desc Update specific Category
// @access Private/Admin
router.put("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idCategorySchema),
    zBodyValidator(zUpdateCategorySchema),
    slugifyCategory,
    updateCategory);

// @desc Delete specific Category
// @access Private/Admin
router.delete("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idCategorySchema),
    removeCategory);


module.exports = router;
