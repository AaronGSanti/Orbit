import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonText } from "@ionic/react";
import { register } from "../services/authService";
import { useState } from "react";

export default function RegisterPage(){
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const handleSubmit = async () => {
        try{
            const data = await register(name, email, password);
            console.log("Register OK" , data);
            window.location.href = "/home";
        }catch(error: any){
            console.log("Error:", error.response?.data);
        }
    };

    return(
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
                    Registro Usuario
                </h2>
    
                <IonList>
                    <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput
                        type="text"
                        value={name}
                        onIonChange={(e) => setName(e.detail.value!)}
                    />
                    </IonItem>

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
                    Registrarse
                </IonButton>
                </div>
            </div>
            </IonContent>
        </IonPage>
    )
}