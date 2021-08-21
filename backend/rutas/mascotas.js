module.exports = function mascotasHandler(mascotas) {
return { 
    get: (data,callback) => {
    if(typeof data.indice !== 'undefined'){
        if(mascotas[data.indice]){
            return callback(200, mascotas[data.indice])
        }
        return callback(404, `La mascota con el indice ${data.indice} no existe`)
    }
   callback(200, mascotas)
},

post:(data,callback) => {
     mascotas.push(data.payload)
    callback(201, data.payload)
 },

 put: (data,callback) => {
    if(typeof data.indice !== 'undefined'){
        if(mascotas[data.indice]){
            mascotas[data.indice] = data.payload
            return callback(200, mascotas[data.indice])
        }
        return callback(404, `La mascota con el indice ${data.indice} no encontrado`)
    }

   callback(400, {mensaje: 'indice no enviado'} )
},
delete: (data,callback) => {
    if(typeof data.indice !== 'undefined'){
        if(mascotas[data.indice]){
            mascotas =  mascotas.filter((_mascota,indice) => indice != data.indice)
            return callback(204, `elemento con indice ${data.indice} elimnado` )
        }
        return callback(404, `La mascota con el indice ${data.indice} no encontrado`)
    }

   callback(400, {mensaje: 'indice no enviado'} )
},


}

}
    
       