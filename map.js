// Asegúrate de que la clave API esté configurada correctamente en el HTML
// Este código espera que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    if (typeof google === 'undefined') {
        console.error("La API de Google Maps no se ha cargado correctamente.");
        return;
    }
    inicializarMapa();
});

// Esta es la función que se usa para inicializar el mapa
function inicializarMapa() {
    const mapElement = document.getElementById('map');  // Asegúrate de que el id sea 'map'
    if (!mapElement) {
        console.error('Contenedor del mapa no encontrado.');
        return;
    }

    // Centra el mapa en Santo Tomé, Corrientes (código postal 3440)
    const map = new google.maps.Map(mapElement, {
        center: { lat: -29.0296, lng: -57.3801 }, // Coordenadas de Santo Tomé, Corrientes
        zoom: 12,  // Nivel de zoom
    });

    // Llama a la función para cargar los alquileres
    cargarAlquileres(map);
}

// Función para cargar los alquileres desde Google Apps Script
function cargarAlquileres(map) {
    fetch('https://script.google.com/macros/s/AKfycbxmoiEnvG-x-Ium5QBAuADIPYI_rIy5Y-azdHDQnpmczlEWSTkHNxRge2VvXxR0MR2x/exec?action=obtener_alquileres')
        .then(response => response.json())
        .then(alquileres => {
            alquileres.forEach(alquiler => {
                const marker = new google.maps.Marker({
                    position: { lat: alquiler.latitud, lng: alquiler.longitud },
                    map: map,
                    title: alquiler.direccion,
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener los alquileres:', error);
        });
}
