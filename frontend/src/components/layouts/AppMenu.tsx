import React from "react";
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";

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
                            Dashboard
                        </IonItem>
                    </IonMenuToggle>

                     {/**MENU TAREAS */}
                    <IonMenuToggle autoHide={false}>
                        <IonItem button detail={false} onClick={() => 
                            history.push("/tasks")
                        }>
                            Tasks
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
        </>
    );
}
export default Menu;
