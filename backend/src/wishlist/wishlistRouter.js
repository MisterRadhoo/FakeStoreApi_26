const express = require("express");
const router = express.Router();

// wishList controller functions
const {
    getLoggedUserWishlist,
    addProductToWishlist,
    removeProductFromWishlist
} = require("../wishlist/wishlistController");

// // zod validation middlewares
const zBodyValidator = require("../middlewares/zodValidators/zBody");
const zParamsValidator = require("../middlewares/zodValidators/zParams");

// validators
const zWishlistProductIdSchema = require("../wishlist/wishlistSchema")

// permissions
const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// @desc Get logged User wishlist
// @access Private/User
router.get("/",
    [requireLogIn, allowedTo("user")],
    getLoggedUserWishlist);

// @desc Add product to wishlist
// @access Private/User
router.post("/",
    [requireLogIn, allowedTo("user")],
    zBodyValidator(zWishlistProductIdSchema),
    addProductToWishlist);

// @desc Remove product from wishlist
// @access Private/User
router.delete("/:productId",
    [requireLogIn, allowedTo("user")],
    zParamsValidator(zWishlistProductIdSchema),
    removeProductFromWishlist);


module.exports = router;