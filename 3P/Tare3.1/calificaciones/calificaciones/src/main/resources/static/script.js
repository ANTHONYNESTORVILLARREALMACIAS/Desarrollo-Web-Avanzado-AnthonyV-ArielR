document.addEventListener("DOMContentLoaded", () => {
    cargarAlumnos();
});

function cargarAlumnos() {
    fetch("http://localhost:8080/api/alumnos")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos del backend:", data); 
            mostrarAlumnos(data); 
            actualizarGrafico(data);
        })
        .catch(error => console.error("Error al cargar alumnos:", error));
}

function determinarEstado(nota) {
    if (nota < 5) return "Suspenso";
    if (nota < 7) return "Bien";
    if (nota < 9) return "Notable";
    return "Sobresaliente";
}

function mostrarAlumnos(alumnos) {
    const tabla = document.getElementById("tabla-alumnos");
    tabla.innerHTML = "";

    alumnos.forEach(alumno => {
        const estado = determinarEstado(alumno.nota);
        tabla.innerHTML += `
            <tr>
                <td>${alumno.nombre}</td>
                <td>${alumno.nota}</td>
                <td>${estado}</td>
                <td>
                    <button onclick="editarAlumno('${alumno.id}', '${alumno.nombre}', ${alumno.nota})" class="btn btn-warning btn-sm">Editar</button>
                    <button onclick="eliminarAlumno('${alumno.id}')" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function editarAlumno(id, nombre, nota) {
    document.getElementById("alumnoId").value = id;
    document.getElementById("nombreAlumno").value = nombre;
    document.getElementById("notaAlumno").value = nota;
    actualizarGrafico();
}

function guardarAlumno(event) {
    event.preventDefault();
    const id = document.getElementById("alumnoId").value;
    const nombre = document.getElementById("nombreAlumno").value;
    const nota = parseFloat(document.getElementById("notaAlumno").value);
    const alumno = { id, nombre, nota };

    if (id) {
        // Actualizar alumno
        fetch(`http://localhost:8080/api/alumnos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alumno)
        }).then(() => {
            cargarAlumnos();
            limpiarFormulario();
        });
    } else {
        // Agregar nuevo alumno
        fetch("http://localhost:8080/api/alumnos", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alumno)
        }).then(() => {
            cargarAlumnos();
            limpiarFormulario();
        });
    }
}

function eliminarAlumno(id) {
    fetch(`http://localhost:8080/api/alumnos/${id}`, {
        method: 'DELETE'
    }).then(() => {
        cargarAlumnos();
    });
}

function limpiarFormulario() {
    document.getElementById("alumnoId").value = "";
    document.getElementById("nombreAlumno").value = "";
    document.getElementById("notaAlumno").value = "";
}

function filtrarPorNombre() {
    const buscador = document.getElementById("buscador").value.toLowerCase();
    const filas = document.getElementById("tabla-alumnos").getElementsByTagName("tr");

    Array.from(filas).forEach(fila => {
        const nombre = fila.cells[0].textContent.toLowerCase();
        if (nombre.includes(buscador)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}

function generarCSV() {
    fetch("http://localhost:8080/api/alumnos")
        .then(res => res.json())
        .then(data => {
            let csv = "Nombre,Nota,Estado\n"; // Agregamos la cabecera con "Estado"
            data.forEach(alumno => {
                const estado = determinarEstado(alumno.nota); // Calculamos el estado
                csv += `${alumno.nombre},${alumno.nota},${estado}\n`; // Agregamos el estado a cada fila
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "alumnos.csv";
            link.click();
        });
}


function actualizarGrafico(alumnos) {
    const ctx = document.getElementById("graficoNotas").getContext("2d");

    // Extraemos nombres y notas de los alumnos
    const nombres = alumnos.map(alumno => alumno.nombre);
    const notas = alumnos.map(alumno => alumno.nota);

    // Verificamos si el gráfico ya existe para actualizarlo
    if (window.miGrafico) {
        window.miGrafico.destroy(); // Eliminamos el gráfico anterior para actualizarlo
    }

    // Creamos un nuevo gráfico con los datos actualizados
    window.miGrafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: nombres,
            datasets: [{
                label: "Notas",
                data: notas,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10 // Ajustamos el máximo para que las notas sean visibles
                }
            }
        }
    });
}

function filtrarPorNota() {
    const min = document.getElementById("notaMin").value;
    const max = document.getElementById("notaMax").value;

    if (min === "" || max === "") {
        alert("Por favor, ingrese valores para la nota mínima y máxima.");
        return;
    }

    fetch(`http://localhost:8080/api/alumnos/filtrar?min=${min}&max=${max}`)
        .then(response => response.json())
        .then(data => {
            mostrarAlumnos(data);
            actualizarGrafico(data);
        })
        .catch(error => console.error("Error al filtrar alumnos:", error));
}

function ordenarPorNota() {
    fetch("http://localhost:8080/api/alumnos/ordenar")
        .then(response => response.json())
        .then(data => {
            mostrarAlumnos(data);
            actualizarGrafico(data);
        })
        .catch(error => console.error("Error al ordenar alumnos:", error));
}


