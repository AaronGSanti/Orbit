import api from "./api";

export const getTasks = async () => {
    const response = await api.get("/api/v1/tasks");
    return response.data;
};

export const searchTasks = async (search: string) => {
    const response = await api.get("/api/v1/tasks/search/" + search);
    return response.data;
}

export const createTask = async (titulo: string , descripcion: string , estado: string , prioridad: string , fecha_limite: string) => {
    const response = await api.post("/api/v1/tasks/store", {
        titulo,
        descripcion,
        estado,
        prioridad,
        fecha_limite
    });

    return response.data;
}

export const deleteTask = async (id: number) => {
    const response = await api.delete("/api/v1/tasks/delete/" + id);
    return response.data;
}