const CustomApiError = require("../../utils/ApiError");
const { Product } = require("../../models/index");


// Middleware Product by slug
const productBySlug = async (req, res, next) => {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug });
    if (!product) {
        throw (CustomApiError.notFound(`Product slug: ${slug}`, "slug"));
    }
    req.product = product;
    return next();
};

module.exports = productBySlug;