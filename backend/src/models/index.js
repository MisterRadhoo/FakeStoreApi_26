const User = require("./userSchema");
const Transaction = require("./transactionSchema");
const TaxRatesList = require("./taxRatesListSchema");
const SubCategory = require("./subCategorySchema");
const Review = require("./reviewSchema");
const Product = require("./productSchema");
const Order = require("./orderSchema");
const Coupon = require("./couponSchema");
const Category = require("./categorySchema");
const Cart = require("./cartSchema");
const Brand = require("./brandSchema");
const ReviewAnalysis = require("../AI/reviewAnalysisSchema");
const BlackList = require("./blackListSchema");

// list of schemas
module.exports = {
    User,
    Transaction,
    TaxRatesList,
    SubCategory,
    Review,
    Product,
    Order,
    Coupon,
    Category,
    Cart,
    Brand,
    ReviewAnalysis,
    BlackList
};