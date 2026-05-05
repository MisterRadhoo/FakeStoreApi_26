import axiosClient from "../config/api";

// @desc Get all Subcategories Interface
export const getSubCategories = async ({ page, limit, keyword, sortedBy } = {}) => {
    const params = {};

    if (page) {
        params.page = page;
    }

    if (limit) {
        params.limit = limit;
    }

    if (keyword) {
        params.keyword = keyword;
    }

    if (sortedBy) {
        params.sortedBy = sortedBy;
    }

    const response = await axiosClient.get("/subcategories", {
        params,
    });

    return response.data;

};