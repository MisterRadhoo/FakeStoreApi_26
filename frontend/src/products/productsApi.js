import axiosClient from "../config/api";

export const getProducts = async ({
    keyword,
    sortedBy,
    fields,
    page,
    limit,
    minPrice,
    maxPrice,
    minRating,
    categoryId,
    brandId
}) => {
    const params = {};

    if (keyword && keyword.length >= 2) {
        params.keyword = keyword;
    }

    if (sortedBy) {
        params.sortedBy = sortedBy;
    }

    if (fields) {
        params.fields = fields;
    }

    if (page) {
        params.page = page;
    }

    if (limit) {
        params.limit = limit;
    }

    if (minPrice) {
        params["price[gte]"] = minPrice;
    }

    if (maxPrice) {
        params["price[lte]"] = maxPrice;
    }

    if (minRating) {
        params["ratingsAverage[gte]"] = minRating;
    }

    if (categoryId) {
        params.categoryId = categoryId;
    }

    if (brandId) {
        params.brandId = brandId;
    }

    const response = await axiosClient.get("/products", {
        params,
    });

    return response.data;
};

export const getProductById = async (productId) => {
    const response = await axiosClient.get(`/products/${productId}`);

    return response.data;
};

export const getProductBySlug = async (slug) => {
    const response = await axiosClient.get(`/products/slug/${slug}`);

    return response.data;
};

export const getRelatedProducts = async ({ productId, page, limit }) => {
    const response = await axiosClient.get(`/products/related/${productId}`, {
        params: {
            page,
            limit,
        },
    });

    return response.data;
};

export const getProductsByCategory = async ({ categoryId, page, limit }) => {
    const response = await axiosClient.get(`/categories/${categoryId}/products/list`, {
        params: {
            page,
            limit,
        },
    });

    return response.data;
};


export const createProduct = async (productData) => {
    const response = await axiosClient.post("/products", productData);

    return response.data;
};

export const updateProduct = async ({ productId, productData }) => {
    const response = await axiosClient.patch(`/products/${productId}`, productData);

    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await axiosClient.delete(`/products/${productId}`);

    return response.data;
};