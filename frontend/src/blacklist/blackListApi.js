import axiosClient from "../config/api";

// @desc Get BlackList
export const getBlackList = async () => {
    const response = await axiosClient.get("/blacklist");
    return response.data;
};