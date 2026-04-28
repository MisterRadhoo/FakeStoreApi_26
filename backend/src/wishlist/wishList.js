const CustomApiError = require("../utils/ApiError");
const { User, Product } = require("../models/index");

// @desc Find User wishlist by userId
const findUserWishlist = async (userId) => {
    const user = await User.findById(userId)
        .populate({ path: "wishlist", select: "_id title imageCover currency price" });

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    return user.wishlist;
};

// @desc Add item to wishlist
const addWishlistItem = async (userId, productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw CustomApiError.notFound(`Product with id: ${productId}`, "productId");
    }

    const user = await User.findByIdAndUpdate(userId,
        { $addToSet: { wishlist: productId } },
        {
            new: true,
            runValidators: true
        }
    ).populate({ path: "wishlist", select: "_id  title imageCover currency price" });

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    return user.wishlist;
};


// @desc Remove item from wishlist
const removeWishlistItem = async (userId, productId) => {
    const user = await User.findByIdAndUpdate(userId,
        { $pull: { wishlist: productId } },
        {
            new: true,
            runValidators: true
        }
    )
        .populate({ path: "wishlist", select: "_id  title imageCover currency price" });

    if (!user) {
        throw CustomApiError.notFound(`User with id: ${userId}`, "userId");
    }

    return user.wishlist;
};


module.exports = {
    findUserWishlist,
    addWishlistItem,
    removeWishlistItem
};