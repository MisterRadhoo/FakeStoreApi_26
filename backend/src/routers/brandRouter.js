const express = require("express");
const router = express.Router();

// Brand controller functions
const {
    createBrand,
    getBrand,
    updateBrand,
    removeBrand,
    getAllBrands,
} = require("../controllers/brandController");

// zod validation middlewares
const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const zParamsValidator = require("../middlewares/zodValidators/zParams");
const zBodyValidator = require("../middlewares/zodValidators/zBody");

// validators
const idBrandSchema = require("../validators/brand/idBrand");
const zBrandSchema = require("../validators/brand/brandSchema");

//permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get all Brands
// @access Public
router.get("/", getAllBrands);

// @desc Get specific Brand
// @access Public
router.get("/:id", zParamsValidator(idBrandSchema), getBrand);

// @desc Add new Brand
// @access Private/Admin
router.post("/", [requireLogIn,
    allowedTo("admin")],
    zBodyValidator(zBrandSchema),
    createBrand);

// @desc Update specific Brand
// @access Private/Admin
router.put("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idBrandSchema),
    zBodyValidator(zBrandSchema),
    updateBrand);

// @desc Delete specific Brand
// @access Private/Admin
router.delete("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idBrandSchema),
    removeBrand);


module.exports = router;