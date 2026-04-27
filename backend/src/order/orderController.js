const CustomApiError = require("../utils/ApiError");
const { createOrder, findOrderById, findUserOrders } = require("./order");

// @desc Create cash Order
const createCashOrder = async (req, res) => {
    const order = await createOrder(
        req.crUser._id,
        req.body.shippingAddress,
        req.body.addressId
    );

    return res.status(201).json({
        message: "Cash order completed!",
        data: order
    });
};

// @desc Get logged User Orders
const getLoggedUserOrders = async (req, res) => {
    const orders = await findUserOrders(req.crUser._id);

    return res.status(200).json({
        results: orders.length,
        data: orders
    });
};


// @desc Get specific Order
const getOrderById = async (req, res) => {
    const order = await findOrderById(req.params.id);

    return res.status(200).json({
        message: "Order retrieved!",
        data: order
    });
};



module.exports = {
    createCashOrder,
    getOrderById,
    getLoggedUserOrders
};