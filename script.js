// script.js

document.addEventListener("DOMContentLoaded", function () {
    const formRegistro = document.getElementById("form-registro");

    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const password = document.getElementById("password").value;

        // Enviar datos al script de Google Apps
        fetch(GOOGLE_SCRIPT_URL + "?action=registro_usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, email, telefono, password })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario registrado:', data);
        })
        .catch(error => console.error('Error en el registro:', error));
    });
});
