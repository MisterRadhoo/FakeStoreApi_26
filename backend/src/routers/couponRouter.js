const express = require("express");
const router = express.Router();

// Coupon controller functions
const {
    createCoupon,
    getCoupon,
    updateCoupon,
    removeCoupon,
    getAllCoupons
} = require("../controllers/couponController");

// zod validation middlewares
const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const zParamsValidator = require("../middlewares/zodValidators/zParams");
const zBodyValidator = require("../middlewares/zodValidators/zBody");

// validators
const idCouponSchema = require("../validators/coupon/idCoupon");
const zCouponSchema = require("../validators/coupon/couponSchema");
const zApiFeatures = require("../validators/zApiFeatures");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get all Coupons
// @access Public
router.get("/", zQueryValidator(zApiFeatures), getAllCoupons);

// @desc Get specific Coupon
// @access Public
router.get("/:id", zParamsValidator(idCouponSchema), getCoupon);

// @desc Create Coupon
// @access Private/Admin
router.post("/", [requireLogIn, allowedTo("admin")], zBodyValidator(zCouponSchema), createCoupon);

// @desc Update specific Coupon
// @access Private/Admin
router.put("/:id", [requireLogIn, allowedTo("admin")], zParamsValidator(idCouponSchema), zBodyValidator(zCouponSchema), updateCoupon);

// @desc Delete specific Coupon
// @access Private/Admin
router.delete("/:id", [requireLogIn, allowedTo("admin")], zParamsValidator(idCouponSchema), removeCoupon);


module.exports = router;