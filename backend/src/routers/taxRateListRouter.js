const express = require("express");
const router = express.Router();

// TaxRateList controller functions
const {
    createTaxRate,
    getTaxRate,
    updateTaxRate,
    removeTaxRate,
    getAllTaxRates
} = require("../controllers/taxRateListController");

// zod validation middlewares
const zParamsValidator = require("../middlewares/zodValidators/zParams");
const zBodyValidator = require("../middlewares/zodValidators/zBody");
const zQueryValidator = require("../middlewares/zodValidators/zQuery");

// validators
const idTaxRateSchema = require("../validators/taxRate/idTaxRate");
const { zCreateTaxRateSchema, zUpdateTaxRateSchema } = require("../validators/taxRate/taxRateListSchema");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get all TaxRates
// @access Public
router.get("/", getAllTaxRates);

// @desc Get specific TaxRate
// @access Public
router.get("/:id", zParamsValidator(idTaxRateSchema), getTaxRate);

// @desc Create TaxRate
// @access Private/Admin
router.post("/",
    [requireLogIn, allowedTo("admin")],
    zBodyValidator(zCreateTaxRateSchema),
    createTaxRate);

// @desc Update specific TaxRate
// @access Private/Admin
router.patch("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idTaxRateSchema),
    zBodyValidator(zUpdateTaxRateSchema),
    updateTaxRate);

// @desc Delete specific TaxRate
// @access Private/Admin
router.delete("/:id",
    [requireLogIn, allowedTo("admin")],
    zParamsValidator(idTaxRateSchema),
    removeTaxRate);

module.exports = router;