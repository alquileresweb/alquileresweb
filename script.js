document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registroForm");
    const loginForm = document.getElementById("loginForm");
    const alquilerForm = document.getElementById("alquilerForm");

    // REGISTRO DE USUARIOS
    registroForm.addEventListener("submit", function (event) {
        event.preventDefault();
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "registrar",
                nombre: nombre.value,
                email: email.value,
                telefono: telefono.value,
                password: password.value
            })
        }).then(response => response.text()).then(alert);
    });

    // INICIO DE SESIÓN
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                email: loginEmail.value,
                password: loginPassword.value
            })
        }).then(response => response.json()).then(data => {
            if (data.status === "success") {
                sessionStorage.setItem("user", loginEmail.value);
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
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "agregarAlquiler",
                emailDueño: sessionStorage.getItem("user"),
                direccion: direccion.value,
                ambientes: ambientes.value,
                precio: precio.value,
                mascotas: mascotas.value
            })
        }).then(response => response.text()).then(alert);
    });
});

// MAPA
let map;
function inicializarMapa() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.667, lng: -60.833 },
        zoom: 12
    });
    cargarAlquileres();
}

function cargarAlquileres() {
    fetch(GOOGLE_SCRIPT_URL + "?action=obtenerAlquileres")
        .then(response => response.json())
        .then(data => {
            data.forEach(alquiler => {
                new google.maps.Marker({
                    position: { lat: parseFloat(alquiler.lat), lng: parseFloat(alquiler.lng) },
                    map: map,
                    title: alquiler.direccion
                });
            });
        });
}
