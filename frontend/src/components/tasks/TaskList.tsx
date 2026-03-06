import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";
import { getTasks } from "../../services/task";
import { pencil, trash } from "ionicons/icons";

function TaskList(){

    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        const fetchTasks = async() =>{
            try{
                const data = await getTasks();
                setTasks(data.data);
            }catch(error){
                console.log("Error", error);
            }
        }
        fetchTasks();
    }, []);
    return(
        <>
            {/**LISTADO DE TAREAS */}
            {tasks.map((task) => (
                <IonCard key={task.id}>
                <IonCardHeader>
                    <IonCardTitle>{task.titulo}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>Estado: {task.estado}</p>
                    <p>Prioridad: {task.prioridad}</p>

                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <IonButton fill="clear">
                            <IonIcon icon={pencil} />
                        </IonButton>
                        <IonButton fill="clear">
                            <IonIcon icon={trash} />
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
            ))}
        </>
    )
}

export default TaskList;