const ListaVeterinarios = document.getElementById('lista-veterinarios')
const apellido= document.getElementById('apellido')
const nombre = document.getElementById('nombre')
const pais= document.getElementById('pais')
const documento = document.getElementById('documento')
const form = document.getElementById('form')
const indice = document.getElementById('indice')
const btnGuardar = document.getElementById('btn-guardar')
const url =  "http://localhost:3000/veterinarios" ;

let editarVeterinario=null
let eliminarVeterinario = null

let veterinarios = []



async function listarVeterinarios() {
 try {
  const respuesta = await  fetch(url)
  const veterinariosServer =  await  respuesta.json()
  if(Array.isArray(veterinariosServer)){
      veterinarios  = veterinariosServer
  }
  if(veterinarios.length>0){
  const veterinarioRender = veterinarios.map((veterinario, index) =>
    `<tr>
       <th scope="row">${index}</th>
       <td>${veterinario.nombre}</td>
       <td>${veterinario.apellido}</td>
       <td>${veterinario.documento}</td>
       <td>
       <button type="button" class="btn btn-primary editar"  data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
       <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
       </td>
    </tr> `
  ).join("");
  ListaVeterinarios.innerHTML = veterinarioRender
  editarVeterinario= document.getElementsByClassName('editar')
  eliminarVeterinario=document.getElementsByClassName('eliminar')
  Array.from(editarVeterinario).forEach((botonEditar,index)=> botonEditar.onclick= editar(index))
  Array.from(eliminarVeterinario).forEach((botonEliminar,index)=> botonEliminar.onclick= eliminar(index))
  return;
  }
  ListaVeterinarios.innerHTML = `<tr>
  <td colspan="5">No hay veterinarios</td>
   </tr> `
   
 } catch (error) {
  console.log({error})
  $(".alert").show();
   
 }
}

async function AgregarVeterinarios(e){
  e.preventDefault()
  try {
    const datos= {
      nombre: nombre.value,
      apellido: apellido.value,
      documento:documento.value
    }
  
    let method = 'POST'
    let urlEnvio = url
    const accion = btnGuardar.innerHTML
    if(accion === 'Editar'){
      method  ='PUT'
      veterinarios[indice.value]=datos
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
    listarVeterinarios()
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
      listarVeterinarios()
      resetModal()
    }
    } catch (error) {
      console.log({erro})
      $(".alert").show();
    }
  }
}


function editar(index){
  return function editarClick(){
    btnGuardar.innerHTML='Editar'
    $('exampleModalCenter').modal('toggle')
    const veterinario =  veterinarios[index]
    documento.value= veterinario.documento
    nombre.value= veterinario.nombre
    apellido.value=veterinario.apellido
    
    indice.value= index
  }
}


function resetModal(){
nombre.value='',
apellido.value='',
documento.value='',
btnGuardar.innerHTML='Crear'
}

btnGuardar.onclick= AgregarVeterinarios




//form.onsubmit=AgregarVeterinarios
listarVeterinarios()





