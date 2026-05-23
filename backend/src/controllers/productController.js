const factory = require("./handlerFactory");
const { Product } = require("../models/index");
const { findRelatedProducts, toObtainProducts } = require("../services/product");

// @desc Create Product
const createProduct = factory.createOne(Product, "Product");
// @desc Get specific Product
const getProduct = factory.getOne(Product,
    [
        { path: "categoryId", select: "name _id" },
        { path: "subcategoriesIds", select: "name _id" },
        { path: "brandId", select: "name _id description" },
        {
            path: "reviews", select: "title ratings userId productId aiStatus createdAt updatedAt",
            populate: { path: "userId", select: "userName _id" }
        }
    ],
    "Product");
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

// @desc Get list of Products by same categoryId (Nested route /api/categories)
// GET /api/categories/:categoryId/products/list
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


module.exports = {
    createProduct,
    updateProduct,
    removeProduct,
    getProduct,
    getSlugProduct,
    getAllProducts,
    getListRelated,
    getListProductsByCategory
};


