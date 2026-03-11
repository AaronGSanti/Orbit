import React from "react";
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { checkbox, home, pricetag } from "ionicons/icons";

function Menu() {
    const history = useHistory();
    return (
        <>
        <IonMenu side="start" contentId="main-content">
            <IonHeader>
            <IonToolbar>
                <IonTitle>Menu</IonTitle>
            </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    {/**MENU HOME */}
                    <IonMenuToggle autoHide={false}>
                        <IonItem button detail={false} onClick={() => history.push("/home")}>
                            <IonIcon icon={home} slot="start" size="large">
                            </IonIcon>
                            <IonLabel>
                                Home
                            </IonLabel>
                        </IonItem>
                    </IonMenuToggle>

                     {/**MENU TAREAS */}
                    <IonMenuToggle autoHide={false}>
                        <IonItem button detail={false} onClick={() => 
                            history.push("/tasks")
                        }>
                            <IonIcon icon={checkbox} slot="start" size="large"></IonIcon>
                            <IonLabel>Tasks</IonLabel>
                        </IonItem>
                    </IonMenuToggle>

                    {/** MENU CATEGORIAS*/}
                    <IonMenuToggle autoHide={false}>
                        <IonItem button detail={false} onClick={() => history.push("/categories")}>
                            <IonIcon icon={pricetag} slot="start" size="large">
                            </IonIcon>
                            <IonLabel>Categories</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
        </>
    );
}
export default Menu;
