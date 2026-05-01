import axiosClient from "../config/api";

export const getCategories = async ({ page, limit, keyword, sortedBy } = {}) => {
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

    const response = await axiosClient.get("/categories", {
        params,
    });

    return response.data;
};

// @desc Get Gategory by id
export const getCategoryById = async (categoryId) => {
    const response = await axiosClient.get(`/categories/${categoryId}`);
    return response.data;
};

// @desc Get Products by same Category
export const getProductsByCategory = async ({ categoryId, page, limit, sort } = {}) => {
    const params = {};

    if (page) {
        params.page = page;
    }

    if (limit) {
        params.limit = limit;
    }

    if (sort) {
        params.sort = sort;
    }

    const response = await axiosClient.get(`/categories/${categoryId}/products/list`, {
        params,
    });

    return response.data;
};