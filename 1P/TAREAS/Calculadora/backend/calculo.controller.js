// Validar si un valor es un número
function esNumero(val) {
    return !isNaN(val) && val !== '';
}

// Lógica para realizar cálculos
function realizarCalculo({ operacion, a, b }) {
    if (!esNumero(a) || !esNumero(b)) {
        throw new Error("Los parámetros 'a' y 'b' deben ser números válidos");
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    let resultado;

    switch (operacion) {
        case 'suma':
            resultado = numA + numB;
            break;
        case 'resta':
            resultado = numA - numB;
            break;
        case 'multiplicacion':
            resultado = numA * numB;
            break;
        case 'division':
            if (numB === 0) {
                throw new Error("No se puede dividir por 0");
            }
            resultado = numA / numB;
            break;
        default:
            throw new Error("Operación no válida. Usa 'suma', 'resta', 'multiplicacion' o 'division'");
    }

    return {
        operacion,
        a: numA,
        b: numB,
        resultado
    };
}

module.exports = {
    realizarCalculo
};
