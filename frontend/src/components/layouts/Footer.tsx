import {IonFooter, IonTitle, IonToolbar } from "@ionic/react";

const Footer: React.FC = () => {
    return(
        <>
            <IonFooter className="ion-no-border">
                <IonToolbar>
                    <IonTitle>
                        © 2026 Orbit. Todos los derechos reservados.
                    </IonTitle>
                </IonToolbar>
            </IonFooter>
        </>
    )
}

export default Footer;