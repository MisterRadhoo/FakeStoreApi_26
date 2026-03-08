const { SubCategory } = require("../models/index");

// @desc Find List of Subcategories service
const findSubCategories = async (categoryId, limit, page, sort) => {
    //pagination
    const limitPage = limit ? Number(limit) : 5;
    const pageNumber = page * 1 || 1;
    const skip = (pageNumber - 1) * limitPage;
    const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

    const filterObject = categoryId ? { category: categoryId } : {};

    const subCategories = await SubCategory
        .find(filterObject)
        .skip(skip)
        .sort(sortBy)
        .limit(limitPage);

    return {
        limit: limitPage,
        page: pageNumber,
        sort: sortBy,
        subCategories
    };
};


module.exports = { findSubCategories };