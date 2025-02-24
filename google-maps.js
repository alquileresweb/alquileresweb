let map;

function inicializarMapa() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.667, lng: -60.833 },
        zoom: 12,
    });
    cargarAlquileres();
}

function cargarAlquileres() {
    fetch(GOOGLE_SCRIPT_URL + "?action=obtenerAlquileres")
        .then(response => response.json())
        .then(data => mostrarAlquileres(data));
}

function mostrarAlquileres(data) {
    map.setZoom(12);
    data.forEach(alquiler => {
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(alquiler.lat), lng: parseFloat(alquiler.lng) },
            map: map,
            title: alquiler.direccion,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<b>${alquiler.direccion}</b><br>${alquiler.ambientes} Ambientes<br>$${alquiler.precio}`,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}

function filtrarAlquileres() {
    const filtroAmbientes = document.getElementById("filtroAmbientes").value;
    const filtroPrecio = document.getElementById("filtroPrecio").value;
    const filtroMascotas = document.getElementById("filtroMascotas").value;

    fetch(GOOGLE_SCRIPT_URL + "?action=obtenerAlquileres")
        .then(response => response.json())
        .then(data => {
            let filtrados = data.filter(alquiler =>
                (!filtroAmbientes || alquiler.ambientes == filtroAmbientes) &&
                (!filtroPrecio || alquiler.precio <= filtroPrecio) &&
                (!filtroMascotas || alquiler.mascotas == filtroMascotas)
            );
            mostrarAlquileres(filtrados);
        });
}
