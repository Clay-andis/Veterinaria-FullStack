const ListaDuenos = document.getElementById('lista-duenos')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const documento = document.getElementById('documento')
const pais = document.getElementById('pais')
const indice = document.getElementById('indice')
const btnGuardar = document.getElementById('btn-guardar')
const url = "http://localhost:3000/duenos"
let eliminarDueno=null
let editarDueno=null

let duenos = []

async function listarDuenos() {
    try {
    const respuesta = await  fetch(url)
    const duenosServer =  await  respuesta.json()
    if(Array.isArray(duenosServer)){
        duenos= duenosServer
    }
    if(duenos.length>0){
        const duenosRender = duenos.map((dueno, index) =>
        `<tr>
    <th scope="row">${index}</th>
    <td>${dueno.nombre}</td>
    <td>${dueno.apellido}</td>
    <td>${dueno.documento}</td>
    <td>
    <button type="button" class="btn btn-primary editar"  data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
    <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </td>
    </tr>`).join("")

    ListaDuenos.innerHTML = duenosRender
    editarDueno = document.getElementsByClassName('editar')
    eliminarDueno= document.getElementsByClassName('eliminar')
    Array.from(editarDueno).forEach((btnEditar,index)=> btnEditar.onclick= editar(index))
    Array.from(eliminarDueno).forEach((btnEliminar,index)=>btnEliminar.onclick=eliminar(index))
    return;
    }
    ListaDuenos.innerHTML = `<tr>
    <td colspan="5">No hay dueños</td>
     </tr> `
    } catch (error) {
        console.log({error})
        $(".alert").show();
        
    }
}

async function AgregarDueno(e){
    e.preventDefault()
    try {
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            documento: documento.value
            
        }
    
        let method = 'POST'
        let urlEnvio =  url
        const accion = btnGuardar.innerHTML;
        if (accion === 'Editar') {
            method = 'PUT'
            duenos[indice.value]= datos;
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
        listarDuenos()
        resetModal()
      }
    } catch (error) {
        console.log({error})
        $(".alert").show();
        
    }
    
    
 
}

function editar(index){
    return function EditarClick(){
        btnGuardar.innerHTML = 'Editar'
        $('exampleModalCenter').modal('toggle')
        const dueno =  duenos[index]
         pais.value  =  dueno.pais
         identificacion.value= dueno.pais
         nombre.value= dueno.nombre
         apellido.value=  dueno.apellido
         indice.value= index
    
    }
}

function resetModal(){
    nombre.value='',
    apellido.value='',
    pais.value='',
    identificacion.value= '',
    indice.value=''
    btnGuardar.innerHTML='Crear'
    }

function eliminar(index){
    return async function EliminarClick(){
        try {
            const urlEnvio  = `${url}/${index}`
            const respuesta = await  fetch(urlEnvio, {
              method: 'DELETE',
          })
          if(respuesta.ok){
            listarDuenos()
            resetModal()
          }
          } catch (error) {
            console.log({error})
            $(".alert").show();
          }
    }

}



listarDuenos()
btnGuardar.onclick= AgregarDueno