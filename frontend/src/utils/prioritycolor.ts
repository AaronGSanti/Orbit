export const getPriorityColor = (priority: string) => {
    switch (priority){
        case "baja":
            return "medium";
        case "media":
            return "primary";
        case "alta":
            return "warning";
        case "urgente":
            return "danger";
        default:
            return "dark";
    }
}