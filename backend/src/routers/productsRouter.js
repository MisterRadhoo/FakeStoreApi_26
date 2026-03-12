const express = require("express");
// Allow to access parameters on other routers
const router = express.Router({ mergeParams: true });

const slugifyProduct = require("../middlewares/product/slugifyMiddleware");
const productBySlug = require("../middlewares/product/productBySlug");
const productById = require("../middlewares/product/paramByIdMiddleware");
const checkProductRefs = require("../middlewares/product/referencesMiddleware");
const zQueryValidator = require("../middlewares/zodValidators/zQuery");
const zParamsValidator = require("../middlewares/zodValidators/zParams");
const zBodyValidator = require("../middlewares/zodValidators/zBody");


const {
    createProduct,
    updateProduct,
    removeProduct,
    getProduct,
    getAllProducts,
    getSlugProduct,
    getListRelated,
    searchProduct
} = require("../controllers/productController");

// validators
const idProductSchema = require("../validators/product/idProduct");
const zCreateProductSchema = require("../validators/product/createProductSchema");
const zPaginationSchema = require("../validators/zPagination");

const { requireLogIn, allowedTo } = require("../auth/authMiddleware");

// nested router
// @desc Get all Reviews on specifique Products
const reviewsRouter = require("./reviewRouter");
router.use("/:productId/reviews", reviewsRouter);

// Parameter used in nested route
router.param("productId", productById);

// @desc Get Product slug
// @access Public
router.get("/slug/:slug", productBySlug, getSlugProduct);

// @desc Get all Products
// @access Public
router.get("/", getAllProducts);

// @desc Get related Product base in productId
// @access Public
router.get("/related/:productId", [requireLogIn, allowedTo("admin")], zQueryValidator(zPaginationSchema), getListRelated);

// @desc Get specific Product
// @access Public
router.get("/:id", zParamsValidator(idProductSchema), getProduct);

// @desc Create Product
// @access Private/Admin
router.post("/", zBodyValidator(zCreateProductSchema), checkProductRefs, slugifyProduct, createProduct);

// @desc Update specific Product
// @access Private/Admin
router.patch("/:id", zParamsValidator(idProductSchema), slugifyProduct, updateProduct);

// @desc Delete specific Product
// @access Private/Admin
router.delete("/:id", zParamsValidator(idProductSchema), removeProduct);

// @desc Product Search
// @access Public
router.post("/search", searchProduct);

module.exports = router;