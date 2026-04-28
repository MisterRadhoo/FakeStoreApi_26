import axiosClient from "../config/api.js";

export const updateMe = (userData) => {
    return axiosClient.patch("/users/me", userData);
};