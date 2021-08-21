const ListaMascota = document.getElementById('lista-mascota')
const tipo = document.getElementById('tipo')
const nombre = document.getElementById('nombre')
const dueno = document.getElementById('dueno')
const form = document.getElementById('form')
const indice = document.getElementById('indice')
const btnGuardar = document.getElementById('btn-guardar')
const url = "http://localhost:3000/mascotas" ; 

let editarMascota=null
let eliminarMascota = null

let mascotas = []


async function listarMascota() {
  try {
   const respuesta= await  fetch(url)
   const mascotaServer =  await  respuesta.json()
   if(Array.isArray(mascotaServer)){
       mascotas  = mascotaServer
   }
   if(mascotas.length>0){
    const mascotaRender = mascotas.map((mascota, index) =>
    `<tr>
       <th scope="row">${index}</th>
       <td>${mascota.tipo}</td>
       <td>${mascota.nombre}</td>
       <td>${mascota.dueno}</td>
       <td>
       <button type="button" class="btn btn-primary editar"  data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
       <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
       </td>
    </tr>
    `
  ).join("");
  ListaMascota.innerHTML = mascotaRender
  editarMascota= document.getElementsByClassName('editar')
  eliminarMascota=document.getElementsByClassName('eliminar')
  Array.from(editarMascota).forEach((botonEditar,index)=> botonEditar.onclick= editar(index))
  Array.from(eliminarMascota).forEach((botonEliminar,index)=> botonEliminar.onclick= eliminar(index))
     return;
   }
   ListaMascota.innerHTML = `<tr>
   <td colspan="5">No hay mascotas</td>
    </tr> `
  } catch (error) {
    console.log({error})
    $(".alert").show();
  }

}
async function AgregarMascota(e){
  e.preventDefault()
  try {
    const datos = {
      tipo:tipo.value,
      nombre: nombre.value,
      dueno: dueno.value
    }
    
    let method = 'POST'
    let urlEnvio =  url
    const accion = btnGuardar.innerHTML;
    if (accion === 'Editar') {
        method = 'PUT'
        mascotas[indice.value]= datos;
        urlEnvio = `${url}/${indice.value}`
    }

  const respuesta = await  fetch(urlEnvio, {
      method,
      headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(datos),
        mode: "cors"
  })
  if(respuesta.ok){
    listarMascota()
    resetModal()
  }
 
    
  } catch (error) {
    console.log({error})
    $(".alert").show();
  }
  
  
}

function eliminar(index){
 return async function eliminarClick(){
  try {
    const urlEnvio  = `${url}/${index}`
    const respuesta = await  fetch(urlEnvio, {
      method: 'DELETE',
  })
  if(respuesta.ok){
    listarMascota()
    resetModal()
  }
  } catch (error) {
    console.log({error})
    $(".alert").show();
  }
  
  }
}


function editar(index){
  return function editarClick(){
    btnGuardar.innerHTML="Editar"
    $('exampleModalCenter').modal('toggle')
    const mascot =  mascotas[index]
    tipo.value= mascot.tipo
    nombre.value= mascot.nombre
    dueno.value= mascot.dueno
    indice.value=index
  
  }
}



function resetModal(){
tipo.value='',
nombre.value='',
dueno.value='',
indice.value=''
btnGuardar.innerHTML='Crear'
}
listarMascota()

btnGuardar.onclick= AgregarMascota







