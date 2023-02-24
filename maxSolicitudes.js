export const maxSolicitudes = (data) => {
    for(const pais in data){
        const maxPais = {dependencia: '', solicitudes: 0};
        console.log(`País: ${pais}`);
        for(const estado in data[pais]){
            const maxEstado = {dependencia: '', solicitudes: 0};
            console.log(`\tEstado: ${estado}`);
            for(const dependencia in data[pais][estado]){
                const solicitudes = data[pais][estado][dependencia].length;
                console.log(`\t\tDependencia: ${dependencia} \tSolicitudes: ${solicitudes}`);

                if(solicitudes > maxEstado.solicitudes){
                    maxEstado.dependencia = dependencia;
                    maxEstado.solicitudes = solicitudes;
                }

                if(solicitudes > maxPais.solicitudes){
                    maxPais.dependencia = dependencia;
                    maxPais.solicitudes = solicitudes;
                }
            }
            console.log(`\t\t*Máximo estatal: ${maxEstado.dependencia}`);
        }
        console.log(`\t*Máximo nacional: ${maxPais.dependencia}`);
    }
};