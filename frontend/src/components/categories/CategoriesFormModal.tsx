import { useEffect, useState } from "react";
import { close } from "ionicons/icons";
import { Category } from "../../pages/Categories";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { createCategory, updateCategory } from "../../services/categories";
import "./CategoriesFormModal.css";
import { colorPalette } from "../../utils/colorPalette";

type CategoriesFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCategoryCreated: () => void | Promise<void>;
    category?: Category | null;
};

const CategoriesFormModal: React.FC<CategoriesFormModalProps> = ({
    isOpen,
    onClose,    
    onCategoryCreated,
    category
}) => {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if(category){
            setNombre(category.nombre || "");
            setColor(category.color || "");
        } else{
            setNombre("");
            setColor("");
        }
    },[category, isOpen]);

    const handleSubmit = async () => {
        if(isSaving) return;
        try{
            setIsSaving(true);
            if(category?.id){
                const data = await updateCategory(
                    category.id,
                    nombre,
                    color
                );
                console.log("Categoria actualizada", data);
            }else {
                const data = await createCategory(
                    color,
                    nombre
                );
                console.log("Tarea creada", data);
            }
            setNombre("");
            setColor("");

            await onCategoryCreated();
        }catch(error:any){
            console.log("Error al guardar tarea:", error.response?.data || error.message);
        }finally{
            setIsSaving(false);
        }
    }

    return(
        <>
            <IonModal isOpen={isOpen} onDidDismiss={onClose}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>
                        {category ? "Editar categoría" : "Nueva categoría"}
                    </IonTitle>

                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                        <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">

                    <div className="category-form">

                    <IonItem className="input-item">
                        <IonLabel position="stacked">Nombre</IonLabel>
                        <IonInput
                        value={nombre}
                        onIonChange={(e) => setNombre(e.detail.value!)}
                        placeholder="Introduce nombre"
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonLabel position="stacked">Color</IonLabel>

                        <div className="color-palette">
                            {colorPalette.map((c) => (
                            <div
                                key={c}
                                className={`color-circle ${color === c ? "selected" : ""}`}
                                style={{ background: c }}
                                onClick={() => setColor(c)}
                            />
                            ))}
                        </div>

                    </IonItem>

                    <div className="button-group">
                        <IonButton expand="block" onClick={handleSubmit} disabled={isSaving}>
                        {category ? "Actualizar" : "Guardar"}
                        </IonButton>

                        <IonButton expand="block" fill="outline" onClick={onClose}>
                        Cancelar
                        </IonButton>
                    </div>

                    </div>

                </IonContent>
            </IonModal>
        </>
    )
}

export default CategoriesFormModal;