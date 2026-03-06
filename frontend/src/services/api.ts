import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000", // tu Laravel
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // importante si usas Sanctum
});

export default api;
