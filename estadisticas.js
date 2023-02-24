import moment from 'moment/moment.js';

export const estadisticas = (data) => {
    for(const pais in data){
        console.log(`País: ${pais}`);
        const tiemposRespuestaPais = [];

        for(const estado in data[pais]){
            console.log(`\tEstado: ${estado}`);
            const tiemposRespuestaEstado = [];

            for(const dependencia in data[pais][estado]){
                data[pais][estado][dependencia].forEach(element => {
                    const fechaSolicitud = moment(element.FECHASOLICITUD, "DD/MM/YYYY");
                    const fechaRespuesta = moment(element.FECHARESPUESTA, "DD/MM/YYYY");
                    const tiempoRespuesta = fechaRespuesta.diff(fechaSolicitud, 'days');

                    tiemposRespuestaEstado.push(tiempoRespuesta);
                    tiemposRespuestaPais.push(tiempoRespuesta);
                });

                paramSolicitudes(tiemposRespuestaEstado);
            }
            paramSolicitudes(tiemposRespuestaPais);
        }
    }
};

const paramSolicitudes = (arr) => {
    const media = getMedia(arr);
    const desviacion = getDesviacion(arr, media);
    const moda = getModa(arr);

    console.log(`Media: ${media}`);
    console.log(`Desviación estándar: ${desviacion}`);
    console.log(`Moda: ${moda}`);
};

const getMedia = (arr) => { 
    let sum = 0;
    arr.forEach(element => {
        sum += element;
    });

    return sum/arr.length;
};

const getDesviacion = (arr, media) => {
    let sum = 0;
    arr.forEach(element => {
        sum += Math.pow((element - media), 2);
    });

    return Math.sqrt(sum/arr.length);
}

const getModa = (arr) => {
    const sorted = arr.sort();
    const midIndex = Math.floor(arr.length/2);

    return sorted[midIndex];
}

