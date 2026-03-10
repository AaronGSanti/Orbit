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
import { getTasks, getTotalTasks } from "../services/task";
import Footer from "../components/layouts/Footer";
import "../components/layouts/AppMenu.css";

const Home: React.FC = () => {
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTotalTasks();
        setTotalTasks(data.total);
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
          <IonToolbar className="custom-toolbar">
              <IonButtons slot="start" className="menu-buttons">
              <IonMenuButton />
              </IonButtons>

              <IonTitle className="header-title">
              <img src="/logo(2).png" alt="Orbit" className="header-logo" />
              </IonTitle>
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
        <Footer/>
      </IonPage>
    </>
  );
};

export default Home;
