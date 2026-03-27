const { Product, Category, SubCategory, Brand } = require("../models/index");
const CustomApiError = require("../utils/ApiError");
const { checkExists } = require("../utils/helpers");

// @desc => description
// @desc Find Products and filter by price in range [min, max]
const findProducts = async (filters, sortBy, order, limit, skip) => {
    const findArgs = {};

    for (let key in filters) {
        if (filters[key] && filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] =
                {
                    $gte: filters[key][0],
                    $lte: filters[key][1]
                };
            } else {
                findArgs[key] = filters[key];
            }
        }
    }

    const products = await Product
        .find(findArgs)
        .select("-image")
        //.populate("categoryId")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit);

    return products;
};

// @desc Find related Products based by same categoryId
const findRelatedProducts = async (categoryId, exceptProductId, limit, page, sort) => {
    // pagination
    const limitPage = limit ? Number(limit) : 10;
    const pageNumber = page * 1 || 1;
    const skip = (pageNumber - 1) * limitPage;
    const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

    const products = await Product.find({
        categoryId: categoryId,
        _id: { $ne: exceptProductId }
    })
        .select("-images -imageCover")
        .sort(sortBy)     // sort: -price (descending), (price ascending)
        .skip(skip)
        .limit(limitPage);

    return {
        limit: limitPage,
        page: pageNumber,
        sort: sortBy,
        products
    };
};

// @desc Assert Product references in db
const assertProductRefs = async (categoryId, subcategoriesIds, brandId) => {
    if (!categoryId) {
        throw CustomApiError.badRequest("CategoryId is required!", "categoryId");
    }
    await checkExists(Category, categoryId, "categoryId");
    await checkExists(SubCategory, subcategoriesIds, "subcategoriesIds");
    await checkExists(Brand, brandId, "brandId");

    // Assert if subcategoriesIds belong to categoryId
    if (!subcategoriesIds) return;

    // If subcategoriesIds is a single id, convert it to an array
    const arrayOfIds = Array.isArray(subcategoriesIds) ? subcategoriesIds : [subcategoriesIds];
    if (!arrayOfIds.length) return;
    // Count the number of subcategories that match the categoryId and are in the array of subcategoriesIds
    const count = await SubCategory.countDocuments({
        _id: { $in: arrayOfIds },
        categoryId: categoryId
    });

    if (count !== arrayOfIds.length) {
        throw CustomApiError.badRequest("SubcategoriesIds do not belong to categoryId!", "subcategoriesIds");
    }
};


module.exports = { findProducts, findRelatedProducts, assertProductRefs };
