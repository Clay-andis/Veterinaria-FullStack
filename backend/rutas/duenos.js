module.exports = function duenosHandler(duenos) {
    return { 
        get: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(duenos[data.indice]){
                return callback(200, duenos[data.indice])
            }
            return callback(404, `El dueno con el indice ${data.indice} no existe`)
        }
       callback(200, duenos) 
    },
    post:(data,callback) => {
         duenos.push(data.payload)
        callback(201, data.payload)
     },
    
     put: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(duenos[data.indice]){
                duenos[data.indice] = data.payload
                return callback(200, duenos[data.indice])
            }
            return callback(404, `El dueno con el indice ${data.indice} no encontrado`)
        }
    
       callback(400, {mensaje: 'indice no enviado'} )
    },
    delete: (data,callback) => {
        if(typeof data.indice !== 'undefined'){
            if(duenos[data.indice]){
                duenos =  duenos.filter((_dueno,indice) => indice != data.indice)
                return callback(204, `elemento con indice ${data.indice} elimnado` )
            }
            return callback(404, `El dueno con el indice ${data.indice} no encontrado`)
        }
    
       callback(400, {mensaje: 'indice no enviado'} )
    },
    
    
    }
    
    }
        
           