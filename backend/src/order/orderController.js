const { createOrder } = require("./order");

// @desc Create cash Order
const createCashOrder = async (req, res) => {
    const order = await createOrder(
        req.crUser._id,
        req.body.shippingAddress
    );

    return res.status(201).json({
        message: "Cash order completed!",
        data: order
    });
};


module.exports = { createCashOrder };