// Asegúrate de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');
    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();

            // Aquí se captura el valor del campo de texto
            const valorPago = document.getElementById('valorPago').value;

            // Genera el link de pago de Mercado Pago (este paso es un ejemplo y depende de la API de Mercado Pago)
            crearLinkDePago(valorPago);
        });
    } else {
        console.log("Formulario no encontrado");
    }
});

// Función para crear el link de pago (simulada)
function crearLinkDePago(valor) {
    console.log('Generando link de pago con valor: ' + valor);
    // Aquí iría la lógica para integrar con la API de Mercado Pago
    alert("Link de pago generado para el valor: " + valor);
}
