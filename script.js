// URL de la API de Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmoiEnvG-x-Ium5QBAuADIPYI_rIy5Y-azdHDQnpmczlEWSTkHNxRge2VvXxR0MR2x/exec";

// Función para registrar un nuevo usuario
function registrarUsuario(nombre, email, telefono, password) {
    const data = {
        action: "registrar",  // Acción que le indica al script qué hacer
        nombre: nombre,
        email: email,
        telefono: telefono,
        password: password
    };

    // Enviar los datos al script de Google Apps
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(result => {
        // Log de la respuesta (puedes mostrar un mensaje al usuario aquí)
        console.log(result);
        alert("Usuario registrado exitosamente.");
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error al registrar al usuario.");
    });
}

// Función para iniciar sesión de un usuario
function loginUsuario(email, password) {
    const data = {
        action: "login",  // Acción para iniciar sesión
        email: email,
        password: password
    };

    // Enviar los datos al script de Google Apps
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        // Mostrar un mensaje si el login es exitoso o no
        if (result === "login exitoso") {
            alert("Inicio de sesión exitoso.");
        } else {
            alert("Credenciales incorrectas.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error al iniciar sesión.");
    });
}

// Manejar el formulario de registro
document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar que la página se recargue

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;

    // Llamar a la función de registro
    registrarUsuario(nombre, email, telefono, password);
});

// Manejar el formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar que la página se recargue

    // Obtener los valores de los campos del formulario
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Llamar a la función de login
    loginUsuario(email, password);
});
