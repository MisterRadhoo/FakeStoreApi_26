import axiosClient from "../config/api.js";

export const registerUser = (userData) => {
    return axiosClient.post("/auth/register", userData);
};

export const loginUser = (credentials) => {
    return axiosClient.post("/auth/login", credentials);
};

export const logoutUser = () => {
    return axiosClient.post("/auth/logout");
};

export const getMe = () => {
    return axiosClient.get("/users/me");
};