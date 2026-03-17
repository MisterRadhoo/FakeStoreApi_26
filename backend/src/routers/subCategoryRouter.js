const express = require("express");
const router = express.Router({ mergeParams: true });

// SubCategory middlewares
const slugifySubCategory = require("../middlewares/subCategory/slugifySubCategory");

// middleware between URL param and body request
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
    getListSubCategories
} = require("../controllers/subCategoryController");

// zod validation middlewares
const zQueryValidator = require("../middlewares/zodValidators/zQuery");

// validators
const zPaginationSchema = require("../validators/zPagination");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Create Subcategory
// @access Private/Admin
router.post("/",
    [requireLogIn, allowedTo("admin")],
    setCategoryToBody,
    slugifySubCategory,
    createSubCategory);


// @desc Get list of Subcategories
// @asc Public
router.get("/list", zQueryValidator(zPaginationSchema), getListSubCategories);

// @desc Get all Subcategories
// @access Public
router.get("/", getAllSubCategories);


// @desc Get specific Subcategory
// @access Public
router.get("/:id", getSubCategory)


// @desc Update specific Subcategory
// @access Private/Admin
router.put("/:id", [requireLogIn, allowedTo("admin")], slugifySubCategory, updateSubCategory);

// @desc Delete specific Subcategory
// @access Private/Admin
router.delete("/:id", [requireLogIn, allowedTo("admin")], removeSubCategory);


module.exports = router;