import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";

import AppMenu from "../components/layouts/AppMenu";
import { getTasks } from "../services/task";

const Home: React.FC = () => {
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTotalTasks(data.total_task ?? 0);
      } catch (error: any) {
        console.log(
          "Error al obtener tareas:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <AppMenu />

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Orbit</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontWeight: "bold" }}>Bienvenido al Dashboard</h1>
            <p> Aqui puedes ver el resumen de tu aplicación.</p>
          </div>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Tareas</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <h1>{loading ? "..." : totalTasks}</h1>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
