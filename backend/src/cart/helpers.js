const CustomApiError = require("../utils/ApiError");
const { Coupon, Product } = require("../models/index");

/**
 * @desc Compute totalPrice for cartItems in Cart
 * @param {Object} cart - Cart document 
 * @returns {Number} totalPrice
 */

const computeTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice += item.quantity * item.price;
    });
    return Number(totalPrice.toFixed(2));
};

// @desc Recompute totalCartPrice when apply Coupon
const recomputeCart = async (cart) => {
    cart.totalCartPrice = computeTotalCartPrice(cart);

    if (cart.couponId) {
        const coupon = await Coupon.findById(cart.couponId);

        if (coupon && coupon.expire > Date.now()) {
            cart.totalPriceAfterDiscount = Number(
                (cart.totalCartPrice - (cart.totalCartPrice * coupon.discount) / 100).toFixed(2));

        } else {
            cart.couponId = undefined;
            cart.totalPriceAfterDiscount = 0;
        }
    } else {
        cart.totalPriceAfterDiscount = 0;
    }

    cart.lastActionAt = Date.now();
};

// @desc Validate Product Stock on Cart
const validateProductStock = async (productId, quantity) => {
    const product = await Product.findOne({
        _id: productId,
        stock: { $gte: quantity }
    });

    if (!product) {
        throw CustomApiError.badRequest("Not enough stock for this product!", "stock");
    }
};


module.exports = {
    computeTotalCartPrice,
    recomputeCart,
    validateProductStock,
};