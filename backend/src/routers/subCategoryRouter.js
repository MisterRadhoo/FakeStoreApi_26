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


// @desc Create Subcategory
// @access Private/Admin
router.post("/", setCategoryToBody, slugifySubCategory, createSubCategory);


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
router.put("/:id", slugifySubCategory, updateSubCategory);

// @desc Delete specific Subcategory
// @access Private/Admin
router.delete("/:id", removeSubCategory);


module.exports = router;