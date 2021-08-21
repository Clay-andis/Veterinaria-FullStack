const ListaConsultas = document.getElementById('lista-consultas')
const mascota = document.getElementById('mascota')
const veterinario = document.getElementById('veterinario')
const historia = document.getElementById('historia')
const diagnostico = document.getElementById('diagnostico')
const indice = document.getElementById('indice')
const formulario =  document.getElementById('form')
const btnGuardar = document.getElementById('btn-guardar')


const url = "http://localhost:3000"

let consultas = []
let mascotas = []
let veterinarios = []

let editarConsulta = null

async function listarConsultas() {
    const entidad = 'consultas'
    try {
        const respuesta = await fetch(`${url}/${entidad}`)
        const consultaServer = await respuesta.json()
        if (Array.isArray(consultaServer)) {
            consultas = consultaServer
        }
        if (respuesta.ok) {
            const htmlConsultas = consultas.map((consulta, index) =>
                `<tr>
    <th scope="row">${index}</th>
    <td>${consulta.mascota.nombre}</td>
    <td>${consulta.veterinario.nombre}${consulta.veterinario.apellido}</td>
    <td>${consulta.diagnostico}</td>
    <td>${consulta.fechaCreacion}</td>
    <td>${consulta.fechaEdicion}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-edit"></i></button>
    </div>
</td>
    </tr>` ).join("");
            ListaConsultas.innerHTML = htmlConsultas
            editarConsulta = document.getElementsByClassName('editar')
            Array.from(editarConsulta).forEach((botonEditar, index) => botonEditar.onclick = editar(index))

        }
    } catch (error) {
        console.log({error})
        $(".alert-danger").show();
    }

}

async function listarMascota() {
    const entidad = 'mascotas'
    try {
        const respuesta = await fetch(`${url}/${entidad}`)
        const mascotaServer = await respuesta.json()
        if (Array.isArray(mascotaServer)) {
            mascotas = mascotaServer
        }
        if (respuesta.ok) {
            mascotas.forEach((_mascota, index) => {
                const opcionActual = document.createElement('option')
                opcionActual.innerHTML = _mascota.nombre
                opcionActual.value = index
                mascota.appendChild(opcionActual)
            })
        }
    } catch (error) {
        console.log({error})
        $(".alert-danger").show();
    }

}
async function listarVeterinario() {
    const entidad = 'veterinarios'
    try {
        const respuesta = await fetch(`${url}/${entidad}`)
        const veterinarioServer = await respuesta.json()
        if (Array.isArray(veterinarioServer)) {
            veterinarios = veterinarioServer
        }
        if (respuesta.ok) {
            veterinarios.forEach((_veterinario, index) => {
                const opcionActual = document.createElement('option')
                opcionActual.innerHTML = _veterinario.nombre
                opcionActual.value = index
                veterinario.appendChild(opcionActual)
            })
        }
    } catch (error) {
        console.log({error})
        $(".alert-danger").show();
    }

}
async function AgregarConsulta(e) {
    e.preventDefault()
    const entidad = 'consultas'
    try {
        const datos = {
            mascota: mascota.value,
            veterinario: veterinario.value,
            diagnostico: diagnostico.value,
            historia: historia.value
        }
        if(validar(datos)===true){
           
        let method = 'POST'
        let urlEnvio = `${url}/${entidad}`
        const accion = btnGuardar.innerHTML;

        if (accion === 'Editar') {
            method = 'PUT'
            urlEnvio += `/${indice.value}`
        }

        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),
            mode: "cors"
        })
        
        if (respuesta.ok) {
            listarConsultas()
            resetModal()
        }
        formulario.classList.add('was-validated');
        return;
        }
        $(".alert-warning").show();

    } catch (error) {
        console.log({error})
        $(".alert-danger").show();

    }
}


function editar(index) {
    return function EditarClick() {
        btnGuardar.innerHTML = 'Editar'
        $('exampleModalCenter').modal('toggle')
        const consulta = consultas[index]
        indice.value = index
        mascota.value = consulta.mascota.id
        veterinario.value = consulta.veterinario.id
        historia.value = consulta.historia
        diagnostico.value = consulta.diagnostico

    }

}

function resetModal() {
    indice.value = '';
    btnGuardar.innerHTML = 'Crear';
    mascota.value = '';
    veterinario.value = '';
    historia.value = '';
    diagnostico.value = '';
    $('exampleModalCenter').modal('toggle');
}

    function validar(datos) {
    if (typeof datos !== "object") return false
    let respuesta = true
    for (let llave in datos) {
        if (datos[llave].length === 0) {
        document.getElementById(llave).classList.add('is-invalid')
        respuesta =false
    }else{
        document.getElementById(llave).classList.remove("is-invalid");
        document.getElementById(llave).classList.add("is-valid");
    }

}
    return respuesta;
}


btnGuardar.onclick = AgregarConsulta
listarConsultas()
listarMascota()
listarVeterinario()