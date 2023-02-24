import { maxSolicitudes } from "./maxSolicitudes.js";
import { estadisticas } from "./estadisticas.js";
import { minTiempoRespuesta } from "./minTiempoRespuesta.js";


const segmentarData = (data) => {
    const registros = {};

    data.results.forEach(element => {
        if(!registros.hasOwnProperty(element.PAIS)){
            registros[element.PAIS] = {};
        }
        if(!registros[element.PAIS].hasOwnProperty(element.ESTADO)){
            registros[element.PAIS][element.ESTADO] = {};
        }
        if(!registros[element.PAIS][element.ESTADO].hasOwnProperty(element.DEPENDENCIA)){
            registros[element.PAIS][element.ESTADO][element.DEPENDENCIA] = [];
        }

        registros[element.PAIS][element.ESTADO][element.DEPENDENCIA].push(element);

    });

    return registros;
}

const fetchData = async () => {
    const fetchedData = await fetch("https://api.datos.gob.mx/v1/inai.solicitudes");
    const dataJSON = await fetchedData.json();
    
    const data = segmentarData(dataJSON);

    //*******************1*******************/
    //Descomentar la línea de abajo para ver los resultados de la pregunta 1
    //maxSolicitudes(data);

    //*******************2*******************/
    //Descomentar la línea de abajo para ver los resultados de la pregunta 2
    //estadisticas(data);

    //*******************3*******************/
    //Descomentar la línea de abajo para ver los resultados de la pregunta 2
    minTiempoRespuesta(data);
};

fetchData();