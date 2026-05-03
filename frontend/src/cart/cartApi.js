import axiosClient from "../config/api.js";

// @desc Add Product to Cart
export const addProductToCart = async ({ productId }) => {
    const response = await axiosClient.post("/cart", {
        productId,
    });

    return response.data;
};


// @desc Update item quantity from cartItems
export const updateCartItemQuantity = async ({ itemId, quantity }) => {
    const response = await axiosClient.patch(`/cart/${itemId}`, {
        quantity,
    });

    return response.data;
};

// @desc Delete specific item from cartItem
export const removeSpecificCartItem = async (itemId) => {
    const response = await axiosClient.delete(`/cart/${itemId}`);
    return response.data;
};

// @desc Get logged User Cart
export const getLoggedUserCart = async () => {
    const response = await axiosClient.get("/cart");
    return response.data;
};

// @desc Cart history for logged User
export const getLoggedUserCartHistory = async () => {
    const response = await axiosClient.get("/cart/history");
    return response.data;
};


// @desc Clear content of Cart
export const clearCart = async () => {
    const response = await axiosClient.delete("/cart");
    return response.data;
};

// @desc Apply Coupon on Cart
export const applyCouponToCart = async ({ coupon }) => {
    const response = await axiosClient.put("/cart/apply-coupon", {
        coupon,
    });

    return response.data;
};

// @desc Remove Coupon from Cart
export const removeCouponFromCart = async () => {
    const response = await axiosClient.delete("/cart/remove-coupon");
    return response.data;
};