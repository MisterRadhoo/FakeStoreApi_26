const express = require("express");
const router = express.Router();

const {
    createBrand,
    getBrand,
    updateBrand,
    removeBrand,
    getAllBrands,
} = require("../controllers/brandController");

//permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get all Brands
// @access Public
router.get("/", getAllBrands);

// @desc Get specific Brand
// @access Public
router.get("/:id", getBrand);

// @desc Add new Brand
// @access Private/Admin
router.post("/", [requireLogIn, allowedTo("admin")], createBrand);

// @desc Update specific Brand
// @access Private/Admin
router.put("/:id", [requireLogIn, allowedTo("admin")], updateBrand);

// @desc Delete specific Brand
// @access Private/Admin
router.delete("/:id", [requireLogIn, allowedTo("admin")], removeBrand);


module.exports = router;