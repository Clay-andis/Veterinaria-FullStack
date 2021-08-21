const recursos  =  require('./recursos')
const mascotas  = require('./rutas/mascotas')
const veterinarios =  require('./rutas/veterinarios')
const duenos =  require('./rutas/duenos')
const consultas  = require('./rutas/consultas')

module.exports = {
    ruta: (data,callback) => {
        callback(200, {mensaje: 'esta es la /ruta'})
    },
    mascotas: mascotas(recursos.mascotas),
    veterinarios: veterinarios(recursos.veterinarios),
    duenos : duenos(recursos.duenos),
    consultas : consultas(recursos),
    noEncontrado: (data,callback) => {
        callback(404,{mensaje: 'Esta no es la ruta'})

    }
}
