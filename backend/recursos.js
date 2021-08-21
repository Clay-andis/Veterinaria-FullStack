module.exports = {
    mascotas: [
        {tipo:'Perro', nombre: 'boby0', dueno:'Carlos'},
        {tipo:'Perro', nombre: 'boby1', dueno:'Carlos'},
        {tipo:'Perro', nombre: 'boby2', dueno:'Carlos'},
        {tipo:'Perro', nombre: 'boby3', dueno:'Carlos'}
    ],
    veterinarios: [
        {nombre:'jhon', apellido: 'barja', documento:'123456'},
        {nombre:'jhon', apellido: 'barja', documento:'123456'},
        {nombre:'jhon', apellido: 'barja', documento:'123456'}
    ],
    duenos: [
        {nombre:'jhon', apellido: 'barja', documento:'123456'},
        {nombre:'jhon', apellido: 'barja', documento:'123456'},
        {nombre:'jhon', apellido: 'barja', documento:'123456'}
    ],
    consultas: [
      {
          mascota: 0,
          veterinario: 0,
          fechaCreacion: new Date(),
          fechaEdicion: new Date(),
          historia:"",
          diagnostico:"Discapacitado"

      },
    ]
}



