import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import { Category } from "../../pages/Categories"
import { pencil, trash } from "ionicons/icons";

type CategorieListProps = {
    categories?: Category[];
    onDelete: (id:number) => void;
    onEdit: (id: number) => void;
}

const CategorieList: React.FC<CategorieListProps> = ({ categories = [] , onDelete , onEdit}) => {
    return(
        <>
            {categories.map((category) => (
                <IonCard 
                    key={category.id}
                    style={{ background: `${category.color}70` }}
                >
                    <IonCardHeader>
                        <IonCardTitle>{category.nombre}</IonCardTitle>
                    </IonCardHeader>
                <IonCardContent>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <IonButtons>
                            {/**Boton EDITAR */}
                            <IonButton onClick={() => onEdit(category.id)}>
                                <IonIcon icon={pencil}/>
                            </IonButton>

                            {/**Boton ELIMINAR */}
                            <IonButton onClick={() => onDelete(category.id)}>
                                <IonIcon icon={trash} />
                            </IonButton>
                        </IonButtons>
                    </div>
                </IonCardContent>
                </IonCard>
            ))}
        </>
    )
}

export default CategorieList;