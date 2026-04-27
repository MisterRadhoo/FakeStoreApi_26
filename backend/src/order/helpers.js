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

// @desc formatOrders object for Order with selected fields
const formatOrders = (orders) => orders.map((order) => ({
    id: order._id,
    orderItems: order.orderItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        imageCover: item.imageCover,
        quantity: item.quantity,
        price: item.price
    })),
    taxPrice: order.taxPrice,
    shippingPrice: order.shippingPrice,
    totalOrderPrice: order.totalOrderPrice,
    currency: order.currency,
    status: order.status,
    createdAt: order.createdAt
}));


module.exports = { validateCartItemsStock, formatOrders };