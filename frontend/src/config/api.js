import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:7800/api",
    withCredentials: true
});


export default axiosClient;
