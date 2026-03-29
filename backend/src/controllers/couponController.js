const factory = require("./handlerFactory");
const { Coupon } = require("../models/index");

// @desc Create Coupon
const createCoupon = factory.createOne(Coupon, "Coupon");
// @desc Get specific Coupon
const getCoupon = factory.getOne(Coupon, null, "Coupon");
// @desc Update specific Coupon
const updateCoupon = factory.updateOne(Coupon, "Coupon");
// @desc Delete specific Coupon
const removeCoupon = factory.deleteOne(Coupon, "Coupon");
// @desc Get all Coupons
const getAllCoupons = factory.getAll(Coupon);


module.exports = {
    createCoupon,
    getCoupon,
    updateCoupon,
    removeCoupon,
    getAllCoupons
};