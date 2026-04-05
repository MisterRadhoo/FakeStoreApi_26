const { SubCategory } = require("../models/index");

// @desc Find Subcategories in db
const findSubCategories = async (categoryId, limit, page, sort) => {
    //pagination
    const limitPage = limit ? Number(limit) : 5;
    const pageNumber = page * 1 || 1;
    const skip = (pageNumber - 1) * limitPage;
    const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

    const filterObject = categoryId ? { categoryId: categoryId } : {};

    const subCategories = await SubCategory
        .find(filterObject)
        .select("_id name slug categoryId")
        .populate({ path: "categoryId", select: "name _id" })
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