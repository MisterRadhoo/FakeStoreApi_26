const CustomApiError = require("../utils/ApiError");
const { Product } = require("../models/index");

// @desc Validate stock Product from cartItems
const validateCartItemsStock = async (cartItems) => {
    for (const item of cartItems) {
        const product = await Product.findOne({
            _id: item.productId,  // check the id, if matched return
            stock: { $gte: item.quantity }   // check if there is enough stock in db
        });
        if (!product) {
            throw CustomApiError.badRequest("Not enough stock for this product!", "stock");
        }
    }
};

module.exports = { validateCartItemsStock };