import axiosClient from "../config/api";

// @desc Create Cash Order
export const createOrder = async (data) => {
    const response = await axiosClient.post("/orders", data);
    return response.data;
};