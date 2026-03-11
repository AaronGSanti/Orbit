import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import AppMenu from "../components/layouts/AppMenu";
import Footer from "../components/layouts/Footer";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import CategoriesFormModal from "../components/categories/CategoriesFormModal";
import CategorieSearch from "../components/categories/CategorieSearch";
import { deleteCategory, getCategories } from "../services/categories";
import CategorieList from "../components/categories/CategoriesList";

export type Category = {
    id: number;
    nombre: string;
    color: string;
}

const Categories: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isSearching , setIsSearching] = useState(false);

    const loadCategories = async () => {
        try{
            const data = await getCategories();
            setCategories(data);
        }catch(error){
            console.log("Error", error);
        }
    }

    const handleDelete = async (id:number) => {
        try{
            await deleteCategory(id);
            await loadCategories();
        }catch(error){
            console.log("Error", error);
        }
    }

    const handleEdit = (id:number) => {
        try{
            const categoryToEdit = categories.find(category => category.id === id);
            if (!categoryToEdit) return;

            setSelectedCategory(categoryToEdit);
            setIsOpen(true);
        }catch(error){
            console.log("Error", error);
        }
    }
        

    useEffect(() => {
        loadCategories();
    },[]);

    return(
        <>
            <AppMenu/>
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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}>

                        <h2 style={{ margin: 0, fontWeight: "bold" , padding:"10px", fontSize:"35px"}}>
                            Gestion Categorias
                        </h2>
                        
                        <IonButton
                            fill="clear"
                            onClick={() => {
                                setSelectedCategory(null);
                                setIsOpen(true);
                            }}
                        >
                            <IonIcon icon={add} size="large" />
                        </IonButton>
                    </div>
                    <CategorieSearch
                            onResults={(results) => {
                                setCategories(results);
                                setIsSearching(true);
                            }}
                            onReset={() => {
                                setIsSearching(false);
                                loadCategories();
                            }}
                    />
                    <CategorieList categories={categories} onDelete={handleDelete} onEdit={handleEdit}/>

                    <CategoriesFormModal
                        isOpen={isOpen} 
                        onClose={() => setIsOpen(false)}
                        onCategoryCreated={ async() => {
                            await loadCategories();
                            setIsSearching(false);
                            setIsOpen(false);
                        }}
                        category={selectedCategory}
                    />
                </IonContent>
                <Footer/>
            </IonPage>
        </>
    );
}
export default Categories;