const { addProduct, findCart, applyCoupon } = require("./cart");

// @desc Add Product to Cart
const addProductToCart = async (req, res) => {
    const cart = await addProduct(
        req.crUser._id,
        req.body.productId
    );

    return res.status(200).json({
        message: "Product added to cart!",
        numberOfCartItems: cart.cartItems.length,
        data: cart
    });
};

// @desc Get Logged User Cart
const getLoggedUserCart = async (req, res) => {
    const cart = await findCart(req.crUser._id);

    return res.status(200).json({
        message: "Cart user retrieved successfully!",
        numberOfCartItems: cart.cartItems.length,
        data: cart
    });
};

// @desc Apply Coupon on logged User Cart
const applyCouponToCart = async (req, res) => {
    const cart = await applyCoupon(
        req.crUser._id,
        req.body.coupon
    );

    return res.status(200).json({
        message: "Coupon applied successfully!",
        numberOfCartItems: cart.cartItems.length,
        data: cart
    });
};






module.exports = { addProductToCart, getLoggedUserCart, applyCouponToCart };