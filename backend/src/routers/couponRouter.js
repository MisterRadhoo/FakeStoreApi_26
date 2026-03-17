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

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get all Coupons
// @access Public
router.get("/", getAllCoupons);

// @desc Get specific Coupon
// @access Public
router.get("/:id", getCoupon);

// @desc Create Coupon
// @access Private/Admin
router.post("/", [requireLogIn, allowedTo("admin")], createCoupon);

// @desc Update specific Coupon
// @access Private/Admin
router.put("/:id", [requireLogIn, allowedTo("admin")], updateCoupon);

// @desc Delete specific Coupon
// @access Private/Admin
router.delete("/:id", [requireLogIn, allowedTo("admin")], removeCoupon);


module.exports = router;