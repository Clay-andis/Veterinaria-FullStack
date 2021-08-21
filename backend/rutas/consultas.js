module.exports = function consultasHandler({consultas, veterinarios, mascotas} ) {
    return { 
        get: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(consultas[data.indice]){
                return callback(200, consultas[data.indice])
            }
            return callback(404, {mensaje:`La consulta con el indice ${data.indice} no existe`})
        }
        const consultasRelaciones =  consultas.map((consulta)=> ({
            ...consulta,
            mascota: {...mascotas[consulta.mascota], id: consulta.mascota},
            veterinario: {...veterinarios[consulta.veterinario], id: consulta.veterinario}
        }))
  

       callback(200, consultasRelaciones) 
    },
    post:(data,callback) => {
        let consultaNueva =  data.payload
        consultaNueva.fechaCreacion =  new Date()
        consultaNueva.fechaEdicion = null
        consultas =  [...consultas, consultaNueva]
        callback(201, consultaNueva)
     },
    
     put: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(consultas[data.indice]){
                const {fechaCreacion}  =  consultas[data.indice]
                consultas[data.indice] = {
                    ...data.payload,
                    fechaCreacion,
                    fechaEdicion :  new Date(),
                }
                return callback(200, consultas[data.indice])
            }
            return callback(404, `La consulta con el indice ${data.indice} no encontrado`)
        }
    
       callback(400, {mensaje: 'indice no enviado'} )
    },
    delete: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(consultas[data.indice]){
                consultas =  consultas.filter((_consulta,indice) => indice != data.indice)
                return callback(204, `elemento con indice ${data.indice} elimnado` )
            }
            return callback(404, `La consulta con el indice ${data.indice} no encontrado`)
        }
    
       callback(400, {mensaje: 'indice no enviado'} )
    },
    
    
    }
    
    }
        
           