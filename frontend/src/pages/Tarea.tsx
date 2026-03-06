import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
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
import { useState } from "react";
import { getTasks } from "../services/task";
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
                <h2 style={{ margin: 0 , fontWeight: "bold"}}>Gestion de Tareas</h2>

                <IonButton fill="clear" onClick={() => setIsOpen(true)}>
                    <IonIcon icon={add} size="large" />
                </IonButton>
            </div>

            {/**BUSCADOR DE TAREAS */}
            <TaskSearch onResults={(tasks) => console.log("Resultados de busqueda: ", tasks)} onReset={() => console.log("Busqueda reseteada")}
            />
            {/**LISTA DE TAREAS */}
            <TaskList/>

            {/**MODAL PARA CREAR TAREAS */}
            <TaskFormModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            </IonContent>
        </IonPage>
        </>
    );
};

export default Tarea;