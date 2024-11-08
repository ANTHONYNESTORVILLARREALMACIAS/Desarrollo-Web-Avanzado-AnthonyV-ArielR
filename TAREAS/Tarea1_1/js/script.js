// Función asincrónica que simula una consulta a una API
function obtenerDatosDeAPI() {
    return new Promise((resolve, reject) => {
        // Simulamos una llamada a la API con un tiempo de espera de 2 segundos
        setTimeout(() => {
            const exito = true; // Cambia a 'false' para simular un error
            if (exito) {
                resolve("Datos recibidos correctamente de la API.");
            } else {
                reject("Error al obtener los datos.");
            }
        }, 2000);
    });
}

// 1. Función con Callback
function ejemploCallback(callback) {
    document.getElementById("callbackOutput").innerText = "Cargando datos con Callback...";
    obtenerDatosDeAPI()
        .then(datos => {
            callback(datos); // Llama al callback con los datos obtenidos
        })
        .catch(error => {
            callback(error);
        });
}

// 2. Función con Promesa
function ejemploPromesa() {
    document.getElementById("promiseOutput").innerText = "Cargando datos con Promesa...";
    return obtenerDatosDeAPI()
        .then(datos => {
            return datos;
        })
        .catch(error => {
            throw error;
        });
}

// 3. Función con Async/Await
async function ejemploAsyncAwait() {
    document.getElementById("asyncAwaitOutput").innerText = "Cargando datos con Async/Await...";
    try {
        const datos = await obtenerDatosDeAPI();
        document.getElementById("asyncAwaitOutput").innerText = datos;
    } catch (error) {
        document.getElementById("asyncAwaitOutput").innerText = error;
    }
}

// Event listeners para los botones

document.getElementById("callbackButton").addEventListener("click", () => {
    ejemploCallback((resultado) => {
        document.getElementById("callbackOutput").innerText = resultado;
    });
});

document.getElementById("promiseButton").addEventListener("click", () => {
    ejemploPromesa().then(resultado => {
        document.getElementById("promiseOutput").innerText = resultado;
    }).catch(error => {
        document.getElementById("promiseOutput").innerText = error;
    });
});

document.getElementById("asyncAwaitButton").addEventListener("click", () => {
    ejemploAsyncAwait();
});
