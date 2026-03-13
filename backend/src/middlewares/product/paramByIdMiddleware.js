const CustomApiError = require("../../utils/ApiError");
const { Product } = require("../../models/index");

// Middleware Param productId for request object (Nested Route)
const productById = async (req, res, next, id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw CustomApiError.notFound(`Product id: ${id}`, "id");
    }
    req.product = product;
    next();
};

module.exports = productById;