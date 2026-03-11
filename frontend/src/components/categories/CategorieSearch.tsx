import { IonSearchbar } from "@ionic/react";
import { search } from "ionicons/icons";
import { useState } from "react";
import { Category } from "../../pages/Categories";
import { searchNameCategory } from "../../services/categories";

type CategorySearchProps = {
    onResults: (categories: Category[]) => void;
    onReset: () => void;
}

const CategorieSearch: React.FC<CategorySearchProps> = ({onResults, onReset}) => {
    const [search, setSearch] = useState("");

    const handleSearch = async (value: string) => {
        setSearch(value);

        if(value.trim() === ""){
            onReset();
            return;
        }

        try{
            const results = await searchNameCategory(value);
            onResults(results);
        }catch(error){
            console.log("Error", error);
        }
    }
    return(
        <>
            <IonSearchbar
                value={search}
                placeholder="Buscar"
                onIonInput={(e) => handleSearch(e.detail.value!)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch(search);
                    }
                }}
            />
        </>
    )
}

export default CategorieSearch;