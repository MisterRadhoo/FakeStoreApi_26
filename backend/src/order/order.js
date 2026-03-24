const CustomApiError = require("../utils/ApiError");
const { findCart } = require("../cart/cart");
const { validateCartItemsStock } = require("./helpers");
const { Product, Cart, Order, TaxRatesList } = require("../models/index");

// @desc Create Order
const createOrder = async (userId, shippingAddress) => {

    // Get Cart of logged User
    const cart = await findCart(userId);

    if (!cart.cartItems || !cart.cartItems.length) {
        throw CustomApiError.badRequest("Cart is empty! Order must have at least 1 product!", "cartItems");
    }

    if (!shippingAddress || !shippingAddress.country) {
        throw CustomApiError.badRequest("Shipping address is required for order!", "shippingAddress");
    }

    // Get TaxRates of specific country from List
    const taxRateDocument = await TaxRatesList.findOne({
        country: shippingAddress.country
    });

    if (!taxRateDocument) {
        throw CustomApiError.notFound(`Tax config for country ${shippingAddress.country}`, "country");
    }

    // Validate stock for cartItems (stock >= 1)
    await validateCartItemsStock(cart.cartItems);

    // Get orderPrice depend on cartPrice "Check if coupon apply"
    const cartPrice = cart.totalPriceAfterDiscount ?
        cart.totalPriceAfterDiscount :
        cart.totalCartPrice;

    // compute taxPrice, shippingPrice and totaOrderPrice
    const taxPrice = Math.round(cartPrice * taxRateDocument.vatRate * 100) / 100;
    const shippingPrice = taxRateDocument.shippingTaxRate;
    const totalOrderPrice = Math.round((cartPrice + taxPrice + shippingPrice) * 100) / 100;

    // Create Order with default payment cash_on_delivery
    const order = await Order.create({
        userId,
        cartId: cart._id,
        orderItems: cart.cartItems,
        taxPrice,
        shippingAddress,
        shippingPrice,
        totalOrderPrice,
        currency: cart.currency,
        paymentMethodType: "cash_on_delivery"
    });

    // After created order, decrement stock product, increment sold product
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.productId },
                update: {
                    $inc: {
                        stock: -item.quantity,
                        sold: item.quantity
                    },
                },
            }
        }));

        await Product.bulkWrite(bulkOption);
        await Cart.findByIdAndUpdate(cart._id, {
            status: "completed"
        });
    }

    return order;
};

module.exports = { createOrder };