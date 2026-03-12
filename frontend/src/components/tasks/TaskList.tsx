import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
} from "@ionic/react";
import { Task } from "../../pages/Tarea";
import { formatLabel } from "../../utils/text";
import { getPriorityColor } from "../../utils/prioritycolor";
import { pencil, trash } from "ionicons/icons";

type TaskListProps = {
    tasks?: Task[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks = [], onDelete , onEdit}) => {
    return (
        <>
        {tasks.map((task) => (
            <IonCard key={task.id}>
            <IonCardHeader>
                <IonCardTitle>{task.titulo}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p><strong>Estado: </strong>{formatLabel(task.estado)}</p>
                <p>
                    <strong>Prioridad: </strong>
                    <IonBadge color={getPriorityColor(task.prioridad)}>
                        {formatLabel(task.prioridad)}
                    </IonBadge>
                </p>
                <p>
                    <strong>Categoria: </strong>{task.category ? task.category.nombre : 'Sin categoria'}
                </p>
                <p><strong>Fecha limite: </strong>{new Date(task.fecha_limite).toLocaleDateString()}</p>

                
                <div style={{display: "flex" , justifyContent: "flex-end"}}>
                    <IonButtons>
                    {/**Boton EDITAR */}
                    <IonButton onClick={() => onEdit(task.id)}>
                        <IonIcon icon={pencil}/>
                    </IonButton>

                    {/**Boton ELIMINAR */}
                    <IonButton onClick={() => onDelete(task.id)}>
                        <IonIcon icon={trash}/>
                    </IonButton>
                </IonButtons>
                </div>
            </IonCardContent>
            </IonCard>
        ))}
        </>
    );
};

export default TaskList;