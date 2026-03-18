const { addProduct, findCart, updateItem, removeItem, applyCoupon, clearContent } = require("./cart");

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

// @desc Update specific item quantity from cartItems
const updateCartItemQuantity = async (req, res) => {
    const cart = await updateItem(
        req.crUser._id,
        req.params.itemId,
        req.body.quantity
    );

    return res.status(200).json({
        message: "Cart item quantity updated successfully!",
        numberOfCartItems: cart.cartItems.length,
        data: cart
    });
};

// @desc Remove specific item from cartItems
const removeSpecificCartItem = async (req, res) => {
    const cart = await removeItem(
        req.crUser._id,
        req.params.itemId
    );

    return res.status(200).json({
        message: "Cart item removed successfully!",
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

// @desc Clear logged User Cart
const clearCart = async (req, res) => {
    await clearContent(req.crUser._id);
    return res.status(200).json({
        message: "No content! Cart cleared!",
        data: null
    });
};


module.exports = {
    addProductToCart,
    getLoggedUserCart,
    updateCartItemQuantity,
    removeSpecificCartItem,
    applyCouponToCart,
    clearCart
};