import api from "./api";

export const login = async (email: string, password: string) => {
    const response = await api.post("/api/v1/login", {
        email,
        password,
    });

    const token = response.data.data.access_token;
    localStorage.setItem("token", token);

    return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    const response = await api.post("/api/v1/register", {
        name,
        email,
        password,
    });

    return response.data;
};