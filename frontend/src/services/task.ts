import api from "./api";

export const getTasks = async () => {
    const response = await api.get("/api/v1/tasks");
    return response.data.data;
};

export const searchTasks = async (search: string) => {
    const response = await api.get("/api/v1/tasks/search/" + search);
    return response.data.data.data;
}

export const createTask = async (titulo: string , descripcion: string , estado: string , prioridad: string , fecha_limite: string , category_id: number | null) => {
    const response = await api.post("/api/v1/tasks/store", {
        titulo,
        descripcion,
        estado,
        prioridad,
        fecha_limite,
        category_id
    });

    return response.data;
}

export const deleteTask = async (id: number) => {
    const response = await api.delete("/api/v1/tasks/delete/" + id);
    return response.data;
}

export const updateTask = async(id:number, titulo:string , descripcion: string, estado: string, prioridad:string, fecha_limite:string, category_id: number | null) => {
    const response = await api.put("/api/v1/tasks/update/" + id , {
        titulo,
        descripcion,
        estado,
        prioridad,
        fecha_limite,
        category_id
    });

    return response.data;
}

export const searchTaskByDate = async (date : string, date2: string) =>{
    const response = await api.get("/api/v1/tasks/search_date/" + date + "/" + date2);
    return response.data.data.data;
}

export const getTotalTasks = async () => {
    const response = await api.get("/api/v1/tasks/totalTasks");
    return response.data;
}