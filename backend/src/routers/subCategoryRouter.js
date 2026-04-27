const express = require("express");
const router = express.Router({ mergeParams: true });

// SubCategory middlewares
const slugifySubCategory = require("../middlewares/subCategory/slugifySubCategory");
const { checkSubCategoryRefs, checkUpdateSubCategoryRefs } = require("../middlewares/subCategory/referenceMiddleware");

// middleware between URL param and body request for (Nested route)
const setCategoryToBody = (req, res, next) => {
    if (req.params.categoryId) {
        req.body.categoryId = req.params.categoryId;
    }
    next();
};

// SubCategory controller functions
const {
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    removeSubCategory,
    getAllSubCategories,
    getListSubCategoriesByCategory
} = require("../controllers/subCategoryController");

// zod validation middlewares
const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const zParamsValidator = require("../middlewares/zodValidators/zParams");
const zBodyValidator = require("../middlewares/zodValidators/zBody");

// validators
const zPaginationSchema = require("../validators/zPagination");
const idSubCategorySchema = require("../validators/subCategory/idSubCategory");
const { zCreateSubCategorySchema, zUpdateSubCategorySchema } = require("../validators/subCategory/createSubCategorySchema");
const zApiFeatures = require("../validators/zApiFeatures");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Create Subcategory
// @access Private/Admin
router.post("/",
    [requireLogIn, allowedTo("admin")],
    setCategoryToBody,
    zBodyValidator(zCreateSubCategorySchema),
    checkSubCategoryRefs,
    slugifySubCategory,
    createSubCategory);

// @desc Get list of Subcategories by same Category
// @asc Public
// GET /api/categories/:categoryId/subcategories/list
router.get("/list",
    zQueryValidator(zPaginationSchema),
    getListSubCategoriesByCategory);

// @desc Get all Subcategories
// @access Public
router.get("/", zQueryValidator(zApiFeatures), getAllSubCategories);

// @desc Get specific Subcategory
// @access Public
router.get("/:id",
    zParamsValidator(idSubCategorySchema),
    getSubCategory);

// @desc Update specific Subcategory
// @access Private/Admin
router.patch("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idSubCategorySchema),
    zBodyValidator(zUpdateSubCategorySchema),
    checkUpdateSubCategoryRefs,
    slugifySubCategory,
    updateSubCategory);

// @desc Delete specific Subcategory
// @access Private/Admin
router.delete("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idSubCategorySchema),
    removeSubCategory);


module.exports = router;