import { IonSearchbar } from "@ionic/react";
import { useState } from "react";
import { searchTasks } from "../../services/task";
import type { Task } from "../../pages/Tarea";

type Props = {
    onResults: (tasks: Task[]) => void;
    onReset: () => void;
}
function TaskSearch({onResults, onReset} : Props) {
    const [search, setSearch] = useState("");

    const handleSearch = async (search: string) => {
        setSearch(search);
        if(!search.trim()){
            onReset();
            return;
        }

        try{
            const results = await searchTasks(search);
            onResults(results);
        }catch(error){
            console.log("Error" , error);
        }
    }
    return(
        <>
            <IonSearchbar placeholder="Buscar" onIonInput={ (e) => handleSearch(e.detail.value!)} debounce={500}></IonSearchbar>
        </>
    )
}

export default TaskSearch;