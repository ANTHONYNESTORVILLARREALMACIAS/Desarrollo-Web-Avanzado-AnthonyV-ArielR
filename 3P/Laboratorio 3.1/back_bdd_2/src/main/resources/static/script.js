const URL_ESTUDIANTES = 'http://localhost:9090/api/estudiantes';
const URL_NOTAS = 'http://localhost:9090/api/notas';

// Función para obtener todos los estudiantes y mostrarlos en la tabla
// Función para obtener todos los estudiantes y mostrarlos en la tabla
function obtenerEstudiantes() {
    fetch(URL_ESTUDIANTES)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tablaEstudiantes').getElementsByTagName('tbody')[0];
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

            data.forEach(estudiante => {
                const row = tabla.insertRow();
                row.insertCell(0).innerText = estudiante.id;
                row.insertCell(1).innerText = estudiante.nombre;
                row.insertCell(2).innerText = estudiante.apellido;
                row.insertCell(3).innerText = estudiante.email;

                // Botones de eliminar y actualizar
                const accionesCell = row.insertCell(4);
                const btnEliminar = document.createElement('button');
                btnEliminar.innerText = 'Eliminar';
                btnEliminar.onclick = () => eliminarEstudiante(estudiante.id);
                accionesCell.appendChild(btnEliminar);

                const btnActualizar = document.createElement('button');
                btnActualizar.innerText = 'Actualizar';
                btnActualizar.onclick = () => mostrarFormularioActualizar(estudiante); // Llamamos a mostrarFormularioActualizar
                accionesCell.appendChild(btnActualizar);

                // Botón para ver las notas del estudiante
                const btnVerNotas = document.createElement('button');
                btnVerNotas.innerText = 'Ver Notas';
                btnVerNotas.onclick = () => obtenerNotasEstudiante(estudiante.id); // Llamamos a la función que obtiene las notas
                accionesCell.appendChild(btnVerNotas);
            });

            // Llenar el select de estudiantes en el formulario de agregar nota
            llenarSelectEstudiantes(data);
        })
        .catch(error => console.error('Error al obtener estudiantes:', error));
}


// Función para obtener las notas de un estudiante específico
// Función para obtener las notas de un estudiante específico
// Función para obtener las notas de un estudiante específico
function obtenerNotasEstudiante(estudianteId) {
    fetch(URL_ESTUDIANTES)  // Realizamos un GET a la API de estudiantes
        .then(response => response.json())
        .then(data => {
            // Buscar el estudiante por su ID
            const estudiante = data.find(est => est.id === estudianteId);

            if (estudiante) {
                // Obtener las notas del estudiante
                const notasEstudiante = estudiante.notas || []; // Asegúrate de que las notas existan en la estructura

                // Mostrar las notas en la tabla o en un área específica de la UI
                const tablaNotas = document.getElementById('tablaNotas').getElementsByTagName('tbody')[0];
                tablaNotas.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

                if (notasEstudiante.length > 0) {
                    notasEstudiante.forEach(nota => {
                        const row = tablaNotas.insertRow();
                        row.insertCell(0).innerText = nota.asignatura;
                        row.insertCell(1).innerText = nota.nota;

                        // Verificar si la fecha existe y formatearla
                        let fecha = nota.fechaRegistro;
                        if (fecha) {
                            const fechaObj = new Date(fecha);
                            fecha = `${fechaObj.getDate().toString().padStart(2, '0')}/${(fechaObj.getMonth() + 1).toString().padStart(2, '0')}/${fechaObj.getFullYear()}`;
                        } else {
                            fecha = 'No disponible';
                        }

                        row.insertCell(2).innerText = fecha;

                        // Agregar botones de eliminar y editar
                        const cellActions = row.insertCell(3);

                        // Botón de editar
                        const btnEditar = document.createElement('button');
                        btnEditar.textContent = 'Editar';
                        btnEditar.classList.add('btn-editar');
                        btnEditar.addEventListener('click', () => editarNota(estudianteId, nota));
                        cellActions.appendChild(btnEditar);

                        // Botón de eliminar
                        const btnEliminar = document.createElement('button');
                        btnEliminar.textContent = 'Eliminar';
                        btnEliminar.classList.add('btn-eliminar');
                        btnEliminar.addEventListener('click', () => eliminarNota(estudianteId, nota.id));
                        cellActions.appendChild(btnEliminar);
                    });
                } else {
                    const row = tablaNotas.insertRow();
                    const cell = row.insertCell(0);
                    cell.colSpan = 4;
                    cell.innerText = 'No se encontraron notas para este estudiante.';
                }
            } else {
                console.error('Estudiante no encontrado');
            }
        })
        .catch(error => console.error('Error al obtener los estudiantes:', error));
}

// Función para mostrar el formulario de actualización de nota
function mostrarFormularioActualizarNota(nota) {
    document.getElementById('idNota').value = nota.id;
    document.getElementById('asignaturaNota').value = nota.asignatura;
    document.getElementById('notaValor').value = nota.nota;
    document.getElementById('fechaRegistroNota').value = nota.fechaRegistro;
}

// Función para agregar o actualizar nota
document.getElementById('formNota').addEventListener('submit', function(event) {
    event.preventDefault();

    const nota = {
        id: document.getElementById('idNota').value,
        asignatura: document.getElementById('asignaturaNota').value,
        nota: parseFloat(document.getElementById('notaValor').value),
        fechaRegistro: document.getElementById('fechaRegistroNota').value,
        estudiante: { id: parseInt(document.getElementById('estudianteId').value) }
    };

    let url = URL_NOTAS;
    let method = 'POST';

    // Si el campo idNota tiene valor, estamos actualizando, así que usamos PUT
    if (nota.id) {
        url = `${URL_NOTAS}/${nota.id}`;
        method = 'PUT';
    }

    // Enviar la solicitud al servidor
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nota)
    })
        .then(response => response.json())
        .then(data => {
            alert(nota.id ? 'Nota actualizada correctamente' : 'Nota agregada correctamente');
            obtenerNotasEstudiante(nota.estudiante.id); // Recargar la lista de estudiantes
        })
        .catch(error => console.error('Error al guardar nota:', error));
});

// Función para resetear el formulario
function resetForm() {
    document.getElementById('formEstudiante').reset();
    document.getElementById('idEstudiante').value = ''; // Limpiar el campo oculto del ID
}

// Función para eliminar un estudiante
function eliminarEstudiante(id) {
    fetch(`${URL_ESTUDIANTES}/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            alert('Estudiante eliminado');
            obtenerEstudiantes(); // Recargar la lista de estudiantes
        })
        .catch(error => console.error('Error al eliminar estudiante:', error));
}

// Función para llenar el select con los estudiantes
function llenarSelectEstudiantes(estudiantes) {
    const select = document.getElementById('estudianteId');
    select.innerHTML = ''; // Limpiar las opciones existentes

    estudiantes.forEach(estudiante => {
        const option = document.createElement('option');
        option.value = estudiante.id;
        option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
        select.appendChild(option);
    });
}
// Función para mostrar el formulario de actualización de estudiante
function mostrarFormularioActualizar(estudiante) {
    document.getElementById('idEstudiante').value = estudiante.id; // Asignar el ID al campo oculto
    document.getElementById('nombre').value = estudiante.nombre;  // Asignar nombre
    document.getElementById('apellido').value = estudiante.apellido; // Asignar apellido
    document.getElementById('email').value = estudiante.email; // Asignar email
    document.getElementById('fechaNacimiento').value = estudiante.fechaNacimiento; // Asignar fecha de nacimiento
}

// Manejo del submit del formulario de estudiantes
document.getElementById('formEstudiante').addEventListener('submit', function(event) {
    event.preventDefault();

    const estudiante = {
        id: document.getElementById('idEstudiante').value,  // Obtener ID
        nombre: document.getElementById('nombre').value,  // Obtener nombre
        apellido: document.getElementById('apellido').value,  // Obtener apellido
        email: document.getElementById('email').value,  // Obtener email
        fechaNacimiento: document.getElementById('fechaNacimiento').value // Obtener fecha de nacimiento
    };

    let url = URL_ESTUDIANTES;
    let method = 'POST';

    // Si el campo idEstudiante tiene valor, estamos actualizando, así que usamos PUT
    if (estudiante.id) {
        url = `${URL_ESTUDIANTES}/${estudiante.id}`;
        method = 'PUT';
    }

    // Enviar la solicitud al servidor
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
    })
        .then(response => response.json())
        .then(data => {
            alert(estudiante.id ? 'Estudiante actualizado correctamente' : 'Estudiante agregado correctamente');
            obtenerEstudiantes(); // Recargar la lista de estudiantes
            resetForm();  // Limpiar el formulario
        })
        .catch(error => console.error('Error al guardar estudiante:', error));
});

// Función para eliminar una nota
function eliminarNota(estudianteId, notaId) {
    fetch(`${URL_NOTAS}/${notaId}`, {
        method: 'DELETE'
    })
        .then(() => {
            alert('Nota eliminada');
            obtenerNotasEstudiante(estudianteId); // Recargar las notas después de eliminar
        })
        .catch(error => console.error('Error al eliminar nota:', error));
}
// Función para editar la nota
function editarNota(estudianteId, nota) {
    // Llenar el formulario con la información de la nota
    document.getElementById('idNota').value = nota.id;
    document.getElementById('asignaturaNota').value = nota.asignatura;
    document.getElementById('notaValor').value = nota.nota;
    document.getElementById('fechaRegistroNota').value = nota.fechaRegistro;
    document.getElementById('estudianteId').value = estudianteId; // Almacenar el ID del estudiante
}

// Llamar a obtenerEstudiantes cuando la página cargue para obtener los estudiantes
document.addEventListener('DOMContentLoaded', obtenerEstudiantes);
