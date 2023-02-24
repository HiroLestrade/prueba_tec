import moment from "moment/moment.js";

export const minTiempoRespuesta = (data) => {
    for(const pais in data){
        console.log(`País: ${pais}`);
        for(const estado in data[pais]){
            const respuestaPais = {};
            for(const dependencia in data[pais][estado]){
                if(!respuestaPais.hasOwnProperty(dependencia)){
                    respuestaPais[dependencia] = {"tiemposRespuesta": [],
                                                    "tiempoPromedio": 0,
                                                    "medioEntregaRapido": []
                                                };
                }

                data[pais][estado][dependencia].forEach(element => {
                    const fechaSolicitud = moment(element.FECHASOLICITUD, "DD/MM/YYYY");
                    const fechaRespuesta = moment(element.FECHARESPUESTA, "DD/MM/YYYY");
                    const tiempoRespuesta = fechaRespuesta.diff(fechaSolicitud, 'days');

                    respuestaPais[dependencia].tiemposRespuesta.push(tiempoRespuesta);
                    respuestaPais[dependencia].tiempoPromedio = respuestaPais[dependencia].tiemposRespuesta.reduce((accum, val) => accum + val) 
                                                                    / respuestaPais[dependencia].tiemposRespuesta.length;
                    
                    if(tiempoRespuesta <= respuestaPais[dependencia].tiempoPromedio && element.MEDIOENTREGA !== ''){
                        respuestaPais[dependencia].medioEntregaRapido.push(element.MEDIOENTREGA);
                    }
                });
                
            }
            console.log(respuestaPais);   
        }
    }
};