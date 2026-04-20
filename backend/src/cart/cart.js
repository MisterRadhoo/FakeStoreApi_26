const CustomApiError = require("../utils/ApiError");
const { Cart, Product, User, Coupon } = require("../models/index");
const { computeTotalCartPrice, recomputeCart, validateProductStock } = require("./helpers");

// @desc Add Product/Create Cart for user when is logged
const addProduct = async (userId, productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw CustomApiError.notFound(`Product id: ${productId}`, "productId");
    }

    let cart = await Cart.findOne({ userId: userId, status: "active" });

    if (!cart) {
        // Validate Product stock >= 1
        await validateProductStock(productId, 1);

        // Create Cart for logged user with Product
        cart = await Cart.create({
            userId: userId,
            cartItems: [{
                productId: productId,
                title: product.title,
                imageCover: product.imageCover,
                price: product.price
            }]
        });
    } else {
        const productIndex = cart.cartItems.findIndex((item) =>
            item.productId.toString() === productId.toString());

        if (productIndex > -1) {
            const cartItem = cart.cartItems[productIndex];
            await validateProductStock(productId, cartItem.quantity + 1);
            cartItem.quantity += 1;
        } else {
            // Product not exist in Cart, push Product to cartItems array
            cart.cartItems.push({
                productId: productId,
                title: product.title,
                imageCover: product.imageCover,
                price: product.price
            });
        }
    }

    await recomputeCart(cart);  // modify document Cart
    await cart.save();
    return cart;
};


// @desc Find Cart for user
const findCart = async (userId) => {
    const cart = await Cart.findOne({
        userId: userId,
        status: "active"
    }).populate({ path: "couponId", select: "_id name expire discount" });

    if (!cart) {
        throw CustomApiError.notFound(`Cart for user id: ${userId}`, "userId");
    }
    return cart;
};

// @desc Update item from Cart
const updateItem = async (userId, itemId, quantity) => {
    const cart = await findCart(userId);
    const itemIndex = cart.cartItems.findIndex((item) =>
        item._id.toString() === itemId.toString());

    if (itemIndex > -1) {
        const cartItem = cart.cartItems[itemIndex];
        await validateProductStock(cartItem.productId, quantity); //Validate Product stock
        cartItem.quantity = quantity;
        cart.cartItems[itemIndex] = cartItem;
    } else {
        throw CustomApiError.notFound(`Cart item id: ${itemId}`, "itemId");
    }

    await recomputeCart(cart);  // modify document Cart
    await cart.save();
    return cart;
};

// @desc Remove item from Cart 
const removeItem = async (userId, itemId) => {
    const cart = await findCart(userId);
    const cartItemIndex = cart.cartItems.findIndex((item) =>
        item._id.toString() === itemId.toString());

    if (cartItemIndex === -1) {
        throw CustomApiError.notFound(`Cart item id: ${itemId}!`, "itemId");
    }

    cart.cartItems.splice(cartItemIndex, 1);

    await recomputeCart(cart);  // modify document Cart
    await cart.save();
    return cart;
};

// @desc Apply Coupon on logged user Cart
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
    const cart = await findCart(userId);

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

// @desc Remove Coupon from logged user Cart
const removeCoupon = async (userId) => {
    const cart = await findCart(userId);
    if (!cart.couponId) {
        throw CustomApiError.badRequest("No coupon applied to this cart!", "coupon");
    }
    cart.couponId = undefined;
    cart.totalPriceAfterDiscount = 0;
    cart.lastActionAt = Date.now();

    await cart.save();
    return cart;
};

// @desc Clear content of logged user Cart
const clearContent = async (userId) => {
    const cart = await Cart.findOneAndDelete({ userId: userId, status: "active" });

    if (!cart) {
        throw CustomApiError.notFound(`Cart for user id: ${userId}!`, "userId");
    }
    return cart;
};

// @desc Get Cart history for logged user
const findCartHistory = async (userId) => {
    const carts = await Cart.find({
        userId: userId,
        status: "completed"
    })
        .populate({ path: "couponId", select: "_id name expire discount" })
        .sort("-createdAt");

    return carts;
};


module.exports = {
    addProduct,
    findCart,
    updateItem,
    removeItem,
    applyCoupon,
    removeCoupon,
    clearContent,
    findCartHistory
};