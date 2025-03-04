// map.js

// Función que inicializa el mapa de Google Maps
function inicializarMapa() {
    const mapOptions = {
        center: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires, Argentina
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Llama a la función para cargar los alquileres
    cargarAlquileres(map);
}

// Función que carga los alquileres desde Google Sheets
function cargarAlquileres(map) {
    fetch(GOOGLE_SCRIPT_URL + "?action=obtener_alquileres")
        .then(response => response.json())
        .then(alquileres => {
            alquileres.forEach(alquiler => {
                new google.maps.Marker({
                    position: { lat: alquiler.latitud, lng: alquiler.longitud },
                    map: map,
                    title: alquiler.direccion
                });
            });
        })
        .catch(error => console.error('Error al obtener los alquileres:', error));
}
