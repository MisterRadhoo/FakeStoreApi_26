const factory = require("./handlerFactory");
const { Product } = require("../models/index");
const { findProducts, findRelatedProducts, toObtainProducts } = require("../services/product");

// @desc Create Product
const createProduct = factory.createOne(Product, "Product");
// @desc Get specific Product
const getProduct = factory.getOne(Product, { path: "reviews" }, "Product");
// @desc Update specific Product
const updateProduct = factory.updateOne(Product, "Product");
// @desc Delete specific Product
const removeProduct = factory.deleteOne(Product, "Product");
// @desc Get all Products
const getAllProducts = factory.getAll(Product);
// @desc Get slug Product
const getSlugProduct = async (req, res) => {
    return res.status(200).json({ object: "slug", product: req.product });
};

// @desc Get related Products by same categoryId
const getListRelated = async (req, res) => {

    const response = await findRelatedProducts(
        req.product.categoryId,
        req.params.productId,
        req.Query.limit,
        req.Query.page,
        req.Query.sort
    );

    return res.status(200).json({
        object: "related_products_list",
        limit: response.limit,
        page: response.page,
        sort: response.sort,
        count: response.products.length,
        products: response.products
    });
};

// @desc Get list of Products by same Category (Nested Route)
const getListProductsByCategory = async (req, res) => {
    const result = await toObtainProducts(
        req.filterObj,
        req.Query.limit,
        req.Query.page,
        req.Query.sort
    );

    return res.status(200).json({
        object: "product_list_by_same_category",
        limit: result.limit,
        page: result.page,
        sort: result.sort,
        count: result.products.length,
        products: result.products
    });
};

// @desc Search Product 
const searchProduct = async (req, res) => {
    const order = req.body.order || "desc";
    const sortBy = req.body.sortBy || "_id";
    const limit = req.body.limit ? Number(req.body.limit) : 25;
    const skip = req.body.skip ? Number(req.body.skip) : 0;
    const filters = req.body.filters || {};

    const products = await findProducts(filters, sortBy, order, limit, skip);
    return res.status(200).json({
        size: products.length,
        data: products
    });
};

module.exports = {
    createProduct,
    updateProduct,
    removeProduct,
    getProduct,
    getSlugProduct,
    getAllProducts,
    searchProduct,
    getListRelated,
    getListProductsByCategory
};


