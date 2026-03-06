import api from "./api";

export const login = async (email: string , password: string) => {
    await api.get("/sanctum/csrf-cookie");
    const response = await api.post("/api/v1/login", {
        email,
        password
    });

    return response.data;
}

export const register = async (name: string, email: string , password: string) => {
    await api.get("/sanctum/csrf-cookie");
    const response = await api.post("/api/v1/register", {
        name,
        email,
        password
    });

    return response.data;
}