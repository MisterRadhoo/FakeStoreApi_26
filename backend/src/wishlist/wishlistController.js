const { findUserWishlist, addWishlistItem, removeWishlistItem } = require("./wishList");


// @desc Get logged User wishlist
const getLoggedUserWishlist = async (req, res) => {
    const wishlist = await findUserWishlist(req.crUser._id);

    return res.status(200).json({
        message: `User wishlist!`,
        numberOfProducts: wishlist.length,
        data: wishlist
    });
};

// @desc Add product to wishlist
const addProductToWishlist = async (req, res) => {
    const wishlist = await addWishlistItem(
        req.crUser._id,
        req.body.productId
    );

    res.status(200).json({
        message: "Product added to your wishlist!",
        numberOfProducts: wishlist.length,
        data: wishlist
    });
};

// @desc Remove product from wishlist
const removeProductFromWishlist = async (req, res) => {
    const wishlist = await removeWishlistItem(
        req.crUser._id,
        req.params.productId
    );

    return res.status(200).json({
        message: "Product removed from your wishlist!",
        numberOfProducts: wishlist.length,
        data: wishlist
    });
};


module.exports = {
    getLoggedUserWishlist,
    addProductToWishlist,
    removeProductFromWishlist
};