module.exports = function veterinariosHandler(veterinarios) {
    return { 
        get: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(veterinarios[data.indice]){
                return callback(200, veterinarios[data.indice])
            }
            return callback(404, `El veterinario con el indice ${data.indice} no existe`)
        }
       callback(200, veterinarios)
    },
    post:(data,callback) => {
         veterinarios.push(data.payload)
        callback(201, data.payload)
     },
    
     put: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(veterinarios[data.indice]){
                veterinarios[data.indice] = data.payload
                return callback(200, veterinarios[data.indice])
            }
            return callback(404, `El veterinario con el indice ${data.indice} no encontrado`)
        }
    
       callback(400, {mensaje: 'indice no enviado'} )
    },
    delete: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(veterinarios[data.indice]){
                veterinarios =  veterinarios.filter((_veterinario,indice) => indice != data.indice)
                return callback(204, `elemento con indice ${data.indice} elimnado` )
            }
            return callback(404, `El veterinario con el indice ${data.indice} no encontrado`)
        }
    
       callback(400, {mensaje: 'indice no enviado'} )
    },
    
    
    }
    
    }
        
           