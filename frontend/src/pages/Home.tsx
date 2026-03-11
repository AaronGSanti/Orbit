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
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";

import AppMenu from "../components/layouts/AppMenu";
import { getTasks, getTotalTasks } from "../services/task";
import Footer from "../components/layouts/Footer";
import "../components/layouts/AppMenu.css";
import { getTotalCategory } from "../services/categories";

const Home: React.FC = () => {
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [loading, setLoading] = useState(true);

const fetchDashboardData = async () => {
    try {
      const [tasksData, categoriesData] = await Promise.all([
        getTotalTasks(),
        getTotalCategory()
      ]);

      setTotalTasks(tasksData.total);
      setTotalCategories(categoriesData.total);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  {/**^Se usa para recargar datos al volver a la pagina */}
  useIonViewWillEnter(() => {
    fetchDashboardData();
  });

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
          {/**TAREAS */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Tareas</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <h1>{loading ? "..." : totalTasks}</h1>
            </IonCardContent>
          </IonCard>

          {/**CATEGORIAS */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Categorias</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <h1>{loading ? "..." : totalCategories}</h1>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <Footer/>
      </IonPage>
    </>
  );
};

export default Home;
