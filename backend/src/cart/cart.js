const CustomApiError = require("../utils/ApiError");
const { Cart, Product, User, Coupon } = require("../models/index");
const { computeTotalCartPrice, recomputeCart } = require("./helpers");

// @desc Add Product/Create Cart for User when is logged
const addProduct = async (userId, productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw CustomApiError.notFound(`Product id: ${productId}!`, "productId");
    }

    let cart = await Cart.findOne({ userId: userId, status: "active" });

    if (!cart) {
        // Create Cart for logged User with Product
        cart = await Cart.create({
            userId: userId,
            cartItems: [{ productId: productId, price: product.price }]
        });
    } else {
        const productIndex = cart.cartItems.findIndex((item) =>
            item.productId.toString() === productId.toString());

        if (productIndex > -1) {
            const cartItem = cart.cartItems[productIndex];
            cartItem.quantity += 1;
        } else {
            // Product not exist in Cart, push Product to cartItems array
            cart.cartItems.push({ productId: productId, price: product.price });
        }
    }

    // cart.totalCartPrice = computeTotalCartPrice(cart);
    // cart.lastActionAt = Date.now();

    await recomputeCart(cart);  // modify document
    await cart.save();
    return cart;
};


// @desc Find Cart for User
const findCart = async (userId) => {
    const cart = await Cart.findOne({
        userId: userId,
        status: "active"
    }).populate({ path: "couponId" }).populate({
        path: "cartItems.productId",
        select: "title imageCover colors price stock"
    });

    if (!cart) {
        throw CustomApiError.notFound(`Cart for user id: ${userId}`, "userId");
    }

    return cart;
};

// @desc Apply Coupon on logged User Cart
const applyCoupon = async (userId, couponName) => {
    // Get coupon based on coupon name
    const coupon = await Coupon.findOne({
        name: couponName,
        expire: { $gt: Date.now() }
    });

    if (!coupon) {
        throw CustomApiError.badRequest("Coupon is invalid or expired!", "coupon");
    }
    
    // Get logged user cart to get totalPriceCart
    const cart = await Cart.findOne({
        userId: userId,
        status: "active"
    });

    if (!cart) {
        throw CustomApiError.notFound(`Cart active for user id: ${userId}!`, "cart");
    }

    const totalPrice = cart.totalCartPrice;
    // Calculate totalPrice after discount have been applied
    const totalPriceAfterDiscount = Number(
        (totalPrice - (totalPrice * coupon.discount) / 100).toFixed(2));

    cart.couponId = coupon._id;
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    cart.lastActionAt = Date.now();

    await cart.save();
    return cart;
};




module.exports = { addProduct, findCart, applyCoupon };