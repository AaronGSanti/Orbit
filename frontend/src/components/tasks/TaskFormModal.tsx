import { useEffect, useState } from "react";
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
import { createTask, updateTask } from "../../services/task";
import { Category, Task } from "../../pages/Tarea";
import { getCategories } from "../../services/categories";

type TaskFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onTaskCreated: () => void | Promise<void>;
    task?: Task | null;
};

const TaskFormModal: React.FC<TaskFormModalProps> = ({
    isOpen,
    onClose,
    onTaskCreated,
    task
}) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState<string>("");
    const [prioridad, setPrioridad] = useState<string>("");
    const [fecha_limite, setFechaLimite] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);

    useEffect(() => {
        if (task) {
            setTitulo(task.titulo || "");
            setDescripcion(task.descripcion || "");
            setEstado(task.estado || "");
            setPrioridad(task.prioridad || "");
            setFechaLimite(task.fecha_limite ? task.fecha_limite.split("T")[0] : "");
            setCategoryId(task.category ? task.category.id : null);
        } else {
            setTitulo("");
            setDescripcion("");
            setEstado("");
            setPrioridad("");
            setFechaLimite("");
            setCategoryId(null);
        }
    }, [task, isOpen]);

    useEffect(() => {
        const loadCategories = async () => {
            try{
                const data = await getCategories();
                setCategories(data);
            }catch(error){
                console.log("Error", error);
            }
        }
        loadCategories();
    }, []);

    const handleSubmit = async () => {
        if (isSaving) return;

        try {
            setIsSaving(true);

            if (task?.id) {
                const data = await updateTask(
                    task.id,
                    titulo,
                    descripcion,
                    estado,
                    prioridad,
                    fecha_limite,
                    categoryId,
                );

                console.log("Tarea actualizada:", data);
            } else {
                const data = await createTask(
                    titulo,
                    descripcion,
                    estado,
                    prioridad,
                    fecha_limite,
                    categoryId,
                );

                console.log("Tarea creada:", data);
            }

            setTitulo("");
            setDescripcion("");
            setEstado("");
            setPrioridad("");
            setFechaLimite("");
            setCategoryId(null);

            await onTaskCreated();
        } catch (error: any) {
            console.log("Error al guardar tarea:", error.response?.data || error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{task ? "Editar tarea" : "Nueva tarea"}</IonTitle>

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
                        <IonInput
                            label="Título"
                            className="big-label"
                            labelPlacement="stacked"
                            value={titulo}
                            onIonChange={(e) => setTitulo(e.detail.value!)}
                            placeholder="Introduce el título"
                        />
                    </IonItem>

                    <IonItem>
                        <IonTextarea
                            label="Descripción"
                            labelPlacement="stacked"
                            value={descripcion}
                            onIonChange={(e) => setDescripcion(e.detail.value!)}
                            placeholder="Describe la tarea"
                            rows={4}
                        />
                    </IonItem>

                    <IonItem>
                        <IonSelect
                            label="Estado"
                            labelPlacement="stacked"
                            value={estado || undefined}
                            onIonChange={(e) => setEstado(String(e.detail.value))}
                            placeholder="Selecciona un estado"
                            interface="popover"
                        >
                            <IonSelectOption value="pendiente">Pendiente</IonSelectOption>
                            <IonSelectOption value="en_progreso">En progreso</IonSelectOption>
                            <IonSelectOption value="bloqueada">Bloqueada</IonSelectOption>
                            <IonSelectOption value="completada">Completada</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonSelect 
                            label="Categoria"
                            labelPlacement="stacked"
                            value={categoryId || undefined}
                            onIonChange={(e) => setCategoryId(e.detail.value)}
                            placeholder="Selecciona una categoria"
                            interface="popover"
                        >
                                {categories.map((category) => (
                                    <IonSelectOption key={category.id} value={category.id}>
                                        {category.nombre}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonSelect
                            label="Prioridad"
                            labelPlacement="stacked"
                            value={prioridad || undefined}
                            onIonChange={(e) => setPrioridad(String(e.detail.value))}
                            placeholder="Selecciona una prioridad"
                            interface="popover"
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
                            preferWheel={false}
                            value={fecha_limite || undefined}
                            onIonChange={(e) => {
                                const value = e.detail.value as string;
                                setFechaLimite(value ? value.split("T")[0] : "");
                            }}
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
                    <IonButton onClick={handleSubmit} disabled={isSaving}>
                        {task ? "Actualizar" : "Guardar"}
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