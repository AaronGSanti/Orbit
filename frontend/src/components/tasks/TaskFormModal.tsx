import { useState } from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { createTask } from "../../services/task";

type TaskFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose }) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [fecha_limite, setFechaLimite] = useState("");

    const handleSubmit = async () => {
    try {
        const data = await createTask(
            titulo,
            descripcion,
            estado,
            prioridad,
            fecha_limite
        );

        console.log("Tarea creada:", data);

        setTitulo("");
        setDescripcion("");
        setEstado("");
        setPrioridad("");
        setFechaLimite("");

        onClose();
        } catch (error: any) {
        console.log("Error al crear tarea:", error.response?.data || error.message);
        }
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonHeader>
            <IonToolbar>
            <IonTitle>Nueva tarea</IonTitle>

            <IonButtons slot="end">
                <IonButton onClick={onClose}>
                <IonIcon icon={close} />
                </IonButton>
            </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
            <IonList>
            <IonItem>
                <IonLabel position="stacked">Título</IonLabel>
                <IonInput
                value={titulo}
                onIonChange={(e) => setTitulo(e.detail.value!)}
                placeholder="Introduce el título"
                />
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Descripción</IonLabel>
                <IonTextarea
                value={descripcion}
                onIonChange={(e) => setDescripcion(e.detail.value!)}
                placeholder="Describe la tarea"
                rows={4}
                />
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Estado</IonLabel>
                <IonSelect
                value={estado}
                onIonChange={(e) => setEstado(e.detail.value)}
                placeholder="Selecciona un estado"
                >
                <IonSelectOption value="pendiente">Pendiente</IonSelectOption>
                <IonSelectOption value="en_progreso">En progreso</IonSelectOption>
                <IonSelectOption value="bloqueada">Bloqueada</IonSelectOption>
                <IonSelectOption value="completada">Completada</IonSelectOption>
                </IonSelect>
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Prioridad</IonLabel>
                <IonSelect
                value={prioridad}
                onIonChange={(e) => setPrioridad(e.detail.value)}
                placeholder="Selecciona una prioridad"
                >
                <IonSelectOption value="baja">Baja</IonSelectOption>
                <IonSelectOption value="media">Media</IonSelectOption>
                <IonSelectOption value="alta">Alta</IonSelectOption>
                <IonSelectOption value="urgente">Urgente</IonSelectOption>
                </IonSelect>
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Fecha límite</IonLabel>
                <IonDatetime
                presentation="date"
                value={fecha_limite}
                onIonChange={(e) => setFechaLimite(e.detail.value as string)}
                />
            </IonItem>
            </IonList>

            <div
            style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
            }}
            >
            <IonButton onClick={handleSubmit}>
                Guardar
            </IonButton>

            <IonButton fill="outline" onClick={onClose}>
                Cancelar
            </IonButton>
            </div>
        </IonContent>
        </IonModal>
    );
};

export default TaskFormModal;