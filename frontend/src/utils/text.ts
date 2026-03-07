/**Funcion para formatear texto, la primera letra en mayuscula y el resto en minuscula */
export const formatLabel = (text: string) => {
    if(!text) return "";

    const clean = text.replace("_"," ");
    return clean.charAt(0).toUpperCase() + clean.slice(1);
}