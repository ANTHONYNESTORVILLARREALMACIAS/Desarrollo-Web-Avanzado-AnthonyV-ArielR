// Simulamos una operación asincrónica de 2 segundos
function simulacionAsincrona(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 1. Función con Callback
function ejemploCallback(callback) {
    document.getElementById("callbackOutput").innerText = "Ejecutando Callback...";
    simulacionAsincrona(2000).then(() => {
        callback("Operación completada con Callback.");
    });
}

// 2. Función con Promesa
function ejemploPromesa() {
    document.getElementById("promiseOutput").innerText = "Ejecutando Promesa...";
    return simulacionAsincrona(2000).then(() => {
        return "Operación completada con Promesa.";
    });
}

// 3. Función con Async/Await
async function ejemploAsyncAwait() {
    document.getElementById("asyncAwaitOutput").innerText = "Ejecutando Async/Await...";
    await simulacionAsincrona(2000);
    document.getElementById("asyncAwaitOutput").innerText = "Operación completada con Async/Await.";
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
    });
});

document.getElementById("asyncAwaitButton").addEventListener("click", () => {
    ejemploAsyncAwait();
});
