import axiosClient from "../config/api.js";

export const getLoggedUserWishlist = async () => {
    const response = await axiosClient.get("/wishlist");
    return response.data;
};


export const addProductToWishlist = async (productId) => {
    const response = await axiosClient.post("/wishlist", {
        productId: productId
    });

    return response.data;
};

export const removeProductFromWishlist = async (productId) => {
    const response = await axiosClient.delete(`/wishlist/${productId}`);
    return response.data;
};