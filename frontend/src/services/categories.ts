import api from "./api";

export const getCategories = async () => {
    const response = await api.get("/api/v1/categories");
    return response.data.data;
}

export const createCategory = async (nombre: string, color:string) => {
    const response = await api.post("/api/v1/categories/store", {
        nombre,
        color
    });

    return response.data;
}

export const deleteCategory =  async(id:number) =>{
    const response = await api.delete("/api/v1/categories/delete/" + id);
    return response.data;
}

export const updateCategory = async (id:number, nombre:string, color:string) => {
    const response = await api.put("/api/v1/categories/update/" + id , {
        color,
        nombre
    });

    return response.data;
}

export const searchNameCategory = async (nombre: string) => {
    const response = await api.get('/api/v1/categories/search/' + nombre );

    return response.data.data;
}

export const getTotalCategory = async () => {
    const response = await api.get("/api/v1/categories/totalCategories");
    return response.data;
}