const express = require("express");
const router = express.Router();

// Cart controller functions 
const {
    addProductToCart,
    getLoggedUserCart,
    updateCartItemQuantity,
    removeSpecificCartItem,
    applyCouponToCart,
    removeCouponFromCart,
    clearCart,
    getLoggedUserCartHistory
} = require("./cartController");

// zod validation middlewares
const zBodyValidator = require("../middlewares/zodValidators/zBody");

// validators
const zCartUpdateQtySchema = require("./cartValidatorSchema");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// rate limiter
const setLimiter = require("../middlewares/limiter/rateLimiter");

// @desc Add Product to Cart
// @access Private/User
router.post("/",
    [requireLogIn, allowedTo("user")],
    setLimiter({ limit: 100 }),
    addProductToCart);

// @desc Get logged user Cart history
// @access Private/User
router.get("/history", [requireLogIn, allowedTo("user")], getLoggedUserCartHistory);

// @desc Get Logged user Cart
// @access Private/User
router.get("/", [requireLogIn, allowedTo("user")], getLoggedUserCart);

// @desc Clear logged user Cart
// @access Private/User
router.delete("/", [requireLogIn, allowedTo("user")], clearCart);

// @desc Apply Coupon on Shopping Cart
// @access Private/User
router.put("/apply-coupon", [requireLogIn, allowedTo("user")], applyCouponToCart);

// @desc Remove Coupon from Shopping Cart
// @access Private/User
router.delete("/remove-coupon", [requireLogIn, allowedTo("user")], removeCouponFromCart);

// @desc Update specific Cart item quantity
// @access Private/User
router.patch("/:itemId",
    [requireLogIn, allowedTo("user")],
    setLimiter({ limit: 100 }),
    zBodyValidator(zCartUpdateQtySchema),
    updateCartItemQuantity);

// @desc Remove specific Cart item
// @access Private/User
router.delete("/:itemId",
    [requireLogIn, allowedTo("user")],
    setLimiter({ limit: 100 }),
    removeSpecificCartItem);

module.exports = router;