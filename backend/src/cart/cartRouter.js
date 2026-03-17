const express = require("express");
const router = express.Router();

// Cart controller functions 
const { addProductToCart, getLoggedUserCart, applyCouponToCart } = require("./cartController");

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");


// @desc Add Product to Cart
// @access Private/User
router.post("/", [requireLogIn, allowedTo("user"), addProductToCart]);

// @desc Get Logged User Cart
// @access Private/User
router.get("/", [requireLogIn, allowedTo("user")], getLoggedUserCart);


// @desc Apply Coupon on Shopping Cart
// @access Private/User
router.put("/apply-coupon", [requireLogIn, allowedTo("user")], applyCouponToCart);










module.exports = router;