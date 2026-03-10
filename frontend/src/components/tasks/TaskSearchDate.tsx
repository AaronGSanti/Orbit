import { IonButton, IonDatetime, IonIcon, IonLabel } from "@ionic/react";
import { useState } from "react"
import "./TaskSearchDate.css"
import { closeCircle, search} from "ionicons/icons";
import TaskList from "./TaskList";

interface Props {
    onSearch: (startDate: string, endDate: string) => void;
    onReset: () => void;
}

function TaskSearchDate({ onSearch, onReset }: Props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearch = () => {
        try{
            const start = startDate.split("T")[0];
            const end = endDate.split("T")[0];

            onSearch(start, end);
        }catch(error) {
            console.log("Error", error);
        }
    };

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        onReset();
    };

    return(
        <>
            <div className="container">
                <IonLabel className="label-date">
                    Selecciona fecha: 
                </IonLabel>
                <div className="date-container">
                    <input className="input-container" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>

                    <input className="input-container" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>

                    <IonButton onClick={handleSearch}>
                        <IonIcon icon={search}/>
                    </IonButton>

                    <IonButton onClick={handleReset}>
                        <IonIcon icon={closeCircle}/>
                    </IonButton>
                </div>
            </div>
        </>
    )
}

export default TaskSearchDate;