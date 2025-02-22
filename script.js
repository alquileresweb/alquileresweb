const API_URL = "https://script.google.com/macros/s/AKfycbz-f1Wzh7g21CvvVfrYYRGs9Gm2wDJaJ8Ro00AGkpA2aprBlyoQ_kv1t8pXFAvaUL7J/exec";

let mapa;
let marcadores = [];
let usuarioLogueado = false;

function iniciarMapa() {
    mapa = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -27.4667, lng: -58.0833 }, // Santo Tomé, Corrientes
        zoom: 12
    });
    cargarAlquileres();
}

function cargarAlquileres() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            marcadores.forEach(marker => marker.setMap(null)); // Borra marcadores anteriores
            marcadores = [];

            data.forEach(alquiler => {
                if (alquiler.dueñoPago === "Sí") {
                    let marker = new google.maps.Marker({
                        position: { lat: parseFloat(alquiler.latitud), lng: parseFloat(alquiler.longitud) },
                        map: mapa,
                        title: alquiler.direccion
                    });

                    let infoWindow = new google.maps.InfoWindow({
                        content: `
                            <h3>${alquiler.direccion}</h3>
                            <p>Precio: $${alquiler.precio}</p>
                            <p>Habitaciones: ${alquiler.habitaciones}</p>
                            <img src="${alquiler.fotos}" width="100">
                        `
                    });

                    marker.addListener("click", () => infoWindow.open(mapa, marker));
                    marcadores.push(marker);
                }
            });
        })
        .catch(error => console.error("Error cargando alquileres:", error));
}

function mostrarSeccion(seccion) {
    // Oculta todas las secciones
    document.getElementById("clientes").style.display = "none";
    document.getElementById("dueños").style.display = "none";

    // Muestra la sección seleccionada
    if (seccion === "clientes") {
        document.getElementById("clientes").style.display = "block";
    } else if (seccion === "dueños") {
        document.getElementById("dueños").style.display = "block";
    }
}

document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    if (!usuarioLogueado) {
        alert("Por favor, inicia sesión antes de agregar un alquiler.");
        return;
    }

    let datos = {
        direccion: document.getElementById("direccion").value,
        latitud: document.getElementById("latitud").value,
        longitud: document.getElementById("longitud").value,
        precio: document.getElementById("precio").value,
        habitaciones: document.getElementById("habitaciones").value,
        fotos: document.getElementById("fotos").value,
        dueñoPago: "Sí"
    };

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(() => {
        alert("Alquiler agregado con éxito!");
        document.getElementById("formulario").reset();
        cargarAlquileres();
    })
    .catch(error => console.error("Error al agregar:", error));
});

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Simulación de login
    usuarioLogueado = true; // Aquí debería ir la validación real
    alert("¡Bienvenido, dueño! Ahora puedes agregar alquileres.");
    mostrarSeccion('dueños');
});

function filtrarAlquileres() {
    let precioMax = document.getElementById("filtro-precio").value;
    let habitaciones = document.getElementById("filtro-habitaciones").value;
    let mascotas = document.getElementById("filtro-mascotas").value;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            let filtrados = data.filter(alquiler => {
                return (!precioMax || alquiler.precio <= precioMax) &&
                       (!habitaciones || alquiler.habitaciones == habitaciones) &&
                       (!mascotas || alquiler.mascotas === mascotas);
            });

            marcadores.forEach(marker => marker.setMap(null)); // Borra marcadores
            marcadores = [];

            filtrados.forEach(alquiler => {
                let marker = new google.maps.Marker({
                    position: { lat: parseFloat(alquiler.latitud), lng: parseFloat(alquiler.longitud) },
                    map: mapa,
                    title: alquiler.direccion
                });

                let infoWindow = new google.maps.InfoWindow({
                    content: `<h3>${alquiler.direccion}</h3><p>Precio: $${alquiler.precio}</p><p>Habitaciones: ${alquiler.habitaciones}</p><img src="${alquiler.fotos}" width="100">`
                });

                marker.addListener("click", () => infoWindow.open(mapa, marker));
                marcadores.push(marker);
            });
        });
}
