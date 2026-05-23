import axiosClient from "../config/api";

export const getTaxRates = async () => {
    const response = await axiosClient.get("/taxrates");
    return response.data;
};