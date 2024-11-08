const fs = require('fs');

function obtenerDatosConCallback(callback) {
    setTimeout(() => {
        console.log("Callback: Datos recibidos correctamente.");
        callback("Callback: Datos recibidos correctamente.");
    }, 2000);
}

function obtenerDatosConPromesa() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Promesa: Datos recibidos correctamente.");
            resolve("Promesa: Datos recibidos correctamente.");
        }, 3000);
    });
}

async function obtenerDatosConAsyncAwait() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Async/Await: Datos recibidos correctamente.");
            resolve("Async/Await: Datos recibidos correctamente.");
        }, 4000);
    });
}

// 1. Ejecutamos la llamada usando Callback
obtenerDatosConCallback((datos) => {
    console.log("Resultado desde Callback:", datos);
});

// 2. Ejecutamos la llamada usando Promesa
obtenerDatosConPromesa()
    .then(datos => {
        console.log("Resultado desde Promesa:", datos);
    })
    .catch(error => {
        console.error("Error en Promesa:", error);
    });

// 3. Ejecutamos la llamada usando Async/Await
(async () => {
    try {
        const datos = await obtenerDatosConAsyncAwait();
        console.log("Resultado desde Async/Await:", datos);
    } catch (error) {
        console.error("Error en Async/Await:", error);
    }
})();
