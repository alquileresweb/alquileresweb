// Usamos la URL de Google Apps Script definida en config.js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmoiEnvG-x-Ium5QBAuADIPYI_rIy5Y-azdHDQnpmczlEWSTkHNxRge2VvXxR0MR2x/exec"; // Asegúrate de reemplazar con tu URL real

function inicializarMapa() {
    const mapOptions = {
        center: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires como ejemplo
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    cargarAlquileres(map);
}

function cargarAlquileres(map) {
    fetch(GOOGLE_SCRIPT_URL + "?action=obtener_alquileres")
        .then(response => response.json())
        .then(alquileres => {
            alquileres.forEach(alquiler => {
                const { lat, lng, direccion, ambientes, precio, permiteMascotas } = alquiler;

                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
                    map: map,
                    title: direccion
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <h3>${direccion}</h3>
                        <p>Ambientes: ${ambientes}</p>
                        <p>Precio: $${precio}</p>
                        <p>Permite mascotas: ${permiteMascotas ? "Sí" : "No"}</p>
                    `
                });

                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });
            });
        })
        .catch(error => console.error('Error al cargar los alquileres:', error));
}
