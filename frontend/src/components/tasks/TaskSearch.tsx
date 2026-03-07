import { IonSearchbar } from "@ionic/react";
import { useState } from "react";
import { searchTasks } from "../../services/task";
import { Task } from "../../pages/Tarea";

type TaskSearchProps = {
    onResults: (tasks: Task[]) => void;
    onReset: () => void;
};

const TaskSearch: React.FC<TaskSearchProps> = ({ onResults, onReset }) => {
    const [search, setSearch] = useState("");

    const handleSearch = async (value: string) => {
        setSearch(value);

        if (value.trim() === "") {
            onReset();
            return;
        }

        try {
            const results = await searchTasks(value);
            onResults(results);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };

    return (
        <IonSearchbar
            value={search}
            placeholder="Buscar"
            onIonInput={(e) => handleSearch(e.detail.value!)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSearch(search);
                }
            }}
        />
    );
};

export default TaskSearch;