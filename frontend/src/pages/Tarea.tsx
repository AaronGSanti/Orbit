import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import AppMenu from "../components/layouts/AppMenu";
import TaskSearch from "../components/tasks/TaskSearch";
import { add } from "ionicons/icons";
import TaskFormModal from "../components/tasks/TaskFormModal";
import { useEffect, useState } from "react";
import { deleteTask, getTasks, updateTask } from "../services/task";
import TaskList from "../components/tasks/TaskList";

export type Task = {
    id: number;
    titulo: string;
    descripcion: string;
    estado: string;
    prioridad: string;
    fecha_limite: string;
};

const Tarea: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
            setFilteredTasks(data);
        } catch (error) {
            console.error("Error al cargar tareas:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try{
            await deleteTask(id);
            await loadTasks();
        }catch(error){
            console.log("Error", error);
        }
    }

    const handleEdit = (id: number) => {
        try{
            const taskToEdit = tasks.find(task => task.id === id);
            if(!taskToEdit) return;

            setSelectedTask(taskToEdit);
            setIsOpen(true);
        }catch(error){
            console.log("Error", error);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <>
            <AppMenu />

            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Orbit</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}
                    >
                        <h2 style={{ margin: 0, fontWeight: "bold" }}>
                            Gestión de Tareas
                        </h2>

                        <IonButton
                            fill="clear"
                            onClick={() => {
                                setSelectedTask(null);
                                setIsOpen(true);
                            }}
                        >
                            <IonIcon icon={add} size="large" />
                        </IonButton>
                    </div>

                    <TaskSearch
                        onResults={(results) => {
                            setFilteredTasks(results);
                            setIsSearching(true);
                        }}
                        onReset={() => {
                            setFilteredTasks(tasks);
                            setIsSearching(false);
                        }}
                    />

                    <TaskList tasks={isSearching ? filteredTasks : tasks} onDelete={handleDelete} onEdit={handleEdit}/>

                    <TaskFormModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onTaskCreated={async() => {
                            await loadTasks();
                            setIsSearching(false);
                            setIsOpen(false);
                            setSelectedTask(null);
                        }}
                        task={selectedTask}
                    />
                </IonContent>
            </IonPage>
        </>
    );
};

export default Tarea;