// script.js

// Maneja el formulario de registro para el dueño
document.getElementById("form-registro").addEventListener("submit", function(e) {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let contrasena = document.getElementById("contrasena").value;

    const data = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        contrasena: contrasena,
        action: "registrar_dueño"
    };

    // Enviar datos al Google Apps Script
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(responseData => {
        alert(responseData.message); // Mensaje de respuesta
    })
    .catch(error => console.error('Error al registrar:', error));
});
