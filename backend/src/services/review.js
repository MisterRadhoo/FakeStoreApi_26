const { Review } = require("../models/index");

// @desc Find list Reviews service
const findReviews = async (filter, limit, page, sort) => {
    // pagination
    const limitPage = limit ? Number(limit) : 10;
    const pageNumber = page * 1 || 1;
    const skip = (pageNumber - 1) * limitPage;
    const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

    const filterObject = filter || {};

    const reviews = await Review
        .find(filterObject)
        .sort(sortBy)
        .skip(skip)
        .limit(limitPage);

    return {
        limit: limitPage,
        page: pageNumber,
        sort: sortBy,
        reviews
    };
};


module.exports = { findReviews };