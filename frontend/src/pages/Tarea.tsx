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
import { deleteTask, getTasks, searchTaskByDate, updateTask } from "../services/task";
import TaskList from "../components/tasks/TaskList";
import TaskSearchDate from "../components/tasks/TaskSearchDate";
import Footer from "../components/layouts/Footer";
import "../components/layouts/AppMenu.css";

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

    const handleSearchByDate = async (startDate: string , endDate: string) => {
        try{
            const response = await searchTaskByDate(startDate,endDate);
            setTasks(response);
        }catch(error){
            console.log("Error", error);
        }
    }

    const handleReset = () => {
        setFilteredTasks(tasks);
        setIsSearching(false);
        loadTasks();
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <>
            <AppMenu />

            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar className="custom-toolbar">
                        <IonButtons slot="start" className="menu-buttons">
                        <IonMenuButton />
                        </IonButtons>

                        <IonTitle className="header-title" style={{color: "black"}}>
                        <img src="/logo(2).png" alt="Orbit" className="header-logo" />
                        </IonTitle>
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
                        <h2 style={{ margin: 0, fontWeight: "bold" , padding:"10px", fontSize:"35px"}}>
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

                    <TaskSearchDate
                        onSearch={handleSearchByDate}
                        onReset={handleReset}
                    >
                    </TaskSearchDate>

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
                <Footer/>
            </IonPage>
        </>
    );
};

export default Tarea;