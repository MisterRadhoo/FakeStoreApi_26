import axiosClient from "../config/api";

export const getBrands = async ({ page, limit, keyword, sortedBy } = {}) => {
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

    const response = await axiosClient.get("/brands", {
        params,
    });

    return response.data;

};