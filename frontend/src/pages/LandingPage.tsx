import { IonButton, IonContent, IonPage } from "@ionic/react";

export default function LandingPage() {
return (
    <IonPage>
        <IonContent
                fullscreen
                style={{
                    "--background": "url('/fondo.png') center/cover no-repeat"
                }}
        >
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "40px 20px",
            }}
        >
        <div />

        {/* Logo centrado */}
        <div style={{ textAlign: "center" }}>
            <img
                src="/logo(2).png"
                alt="Orbit"
                style={{
                width: "620px",
                maxWidth: "80%",
                }}
            />
        </div>

        {/* Botones*/}
        <div style={{ width: "100%", maxWidth: "400px" }}>
            <IonButton
                expand="block"
                style={{
                marginBottom: "12px",
                color: "#fff",
                }}
                routerLink="/register"
            >
                Get Started
            </IonButton>

            <IonButton expand="block" fill="outline" routerLink="/login">
                Login
            </IonButton>
        </div>
        </div>
        </IonContent>
    </IonPage>
    );
}
