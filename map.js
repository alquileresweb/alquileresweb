// Esta función inicializa el mapa de Google y carga los alquileres desde Google Sheets.
function inicializarMapa() {
    // Inicia el mapa en una ubicación predeterminada
    const mapOptions = {
        center: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires como ejemplo
        zoom: 12
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Llama a la función que carga los alquileres desde Google Apps Script
    cargarAlquileres(map);
}

// Función que obtiene los alquileres desde Google Apps Script (usando Fetch API)
function cargarAlquileres(map) {
    // URL del script de Google Apps (tu URL personalizada de Google Apps Script)
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmoiEnvG-x-Ium5QBAuADIPYI_rIy5Y-azdHDQnpmczlEWSTkHNxRge2VvXxR0MR2x/exec";

    fetch(GOOGLE_SCRIPT_URL + "?action=obtener_alquileres")
        .then(response => response.json())
        .then(alquileres => {
            alquileres.forEach(alquiler => {
                const { lat, lng, direccion, ambientes, precio, permiteMascotas } = alquiler;

                // Crea un marcador en el mapa para cada alquiler
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
                    map: map,
                    title: direccion
                });

                // Agrega un infowindow al marcador con la información del alquiler
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
