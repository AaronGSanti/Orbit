import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonText,
} from "@ionic/react";
import { login } from "../services/authService";
import { useState } from "react";
import { useHistory } from "react-router";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async () => {
        try {
        const data = await login(email, password);
        console.log("Login OK", data);
        history.push("/home");
        } catch (error: any) {
        console.log("Error:", error.response?.data);
        }
    };

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
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            }}
        >
            <div style={{ width: "100%", maxWidth: "400px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                Iniciar Sesión
            </h2>

            <IonList>
                <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                />
                </IonItem>

                <IonItem>
                <IonLabel position="stacked">Contraseña</IonLabel>
                <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                />
                </IonItem>
            </IonList>

            <IonButton
                expand="block"
                style={{ marginTop: "20px" }}
                onClick={handleSubmit}
            >
                Entrar
            </IonButton>

            <IonText color="medium">
                <p style={{ textAlign: "center", marginTop: "15px" }}>
                ¿No tienes cuenta?
                    <span style={{ color: "#3880ff" , cursor: "pointer"}}
                    onClick={() => history.push("/register")}>

                    </span>
                </p>
            </IonText>
            </div>
        </div>
        </IonContent>
    </IonPage>
    );
}
