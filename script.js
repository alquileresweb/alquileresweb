document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registroForm");
    const loginForm = document.getElementById("loginForm");
    const alquilerForm = document.getElementById("alquilerForm");

    // REGISTRO
    registroForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = {
            action: "registrar",
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value,
            password: document.getElementById("password").value,
        };

        fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify(data) })
        .then(response => response.text())
        .then(data => alert(data));
    });

    // INICIO DE SESIÓN
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = {
            action: "login",
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value,
        };

        fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify(data) })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                sessionStorage.setItem("user", data.email);
                document.getElementById("auth").style.display = "none";
                document.getElementById("dashboard").style.display = "block";
                cargarAlquileres();
            } else {
                alert("Error: " + data.message);
            }
        });
    });

    // AGREGAR ALQUILER
    alquilerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailDueño = sessionStorage.getItem("user");
        const data = {
            action: "agregarAlquiler",
            emailDueño,
            direccion: document.getElementById("direccion").value,
            ambientes: document.getElementById("ambientes").value,
            precio: document.getElementById("precio").value,
            mascotas: document.getElementById("mascotas").value,
        };

        fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify(data) })
        .then(response => response.text())
        .then(data => alert(data));
    });
});
