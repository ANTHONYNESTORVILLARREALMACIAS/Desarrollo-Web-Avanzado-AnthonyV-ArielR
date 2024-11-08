// Seleccionamos el elemento donde mostraremos los resultados
const outputDiv = document.getElementById("output");

// Ejemplo de asincronismo usando CALLBACKS
function ejemploCallback(callback) {
    setTimeout(() => {
        const mensaje = "Operación completada con Callback.";
        callback(mensaje);
    }, 2000);
}

// Función que ejecuta el ejemplo de Callback
document.getElementById("callbackButton").addEventListener("click", () => {
    outputDiv.innerHTML = "Ejecutando Callback...";
    ejemploCallback((resultado) => {
        outputDiv.innerHTML = resultado;
    });
});

// Ejemplo de asincronismo usando PROMESAS
function ejemploPromesa() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = true; 
            if (exito) {
                resolve("Operación completada con Promesa.");
            } else {
                reject("Error en la operación de Promesa.");
            }
        }, 2000);
    });
}

// Función que ejecuta el ejemplo de Promesas
document.getElementById("promiseButton").addEventListener("click", () => {
    outputDiv.innerHTML = "Ejecutando Promesa...";
    ejemploPromesa()
        .then((resultado) => {
            outputDiv.innerHTML = resultado;
        })
        .catch((error) => {
            outputDiv.innerHTML = error;
        });
});

// Ejemplo de asincronismo usando ASYNC/AWAIT
async function ejemploAsyncAwait() {
    try {
        outputDiv.innerHTML = "Ejecutando Async/Await...";
        const resultado = await ejemploPromesa();
        outputDiv.innerHTML = resultado;
    } catch (error) {
        outputDiv.innerHTML = error;
    }
}

// Función que ejecuta el ejemplo de Async/Await
document.getElementById("asyncAwaitButton").addEventListener("click", () => {
    ejemploAsyncAwait();
});
