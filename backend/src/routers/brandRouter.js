const express = require("express");
const router = express.Router();

const {
    createBrand,
    getBrand,
    updateBrand,
    removeBrand,
    getAllBrands,
} = require("../controllers/brandController");

// @desc Get all Brands
// @access Public
router.get("/", getAllBrands);

// @desc Get specific Brand
// @access Public
router.get("/:id", getBrand);

// @desc Add new Brand
// @access Private/Admin
router.post("/", createBrand);

// @desc Update specific Brand
// @access Private/Admin
router.put("/:id", updateBrand);

// @desc Delete specific Brand
// @access Private/Admin
router.delete("/:id", removeBrand);


module.exports = router;