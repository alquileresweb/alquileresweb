let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -27.3702, lng: -59.2707 }, // Coordenadas de Santo Tomé, Corrientes
        zoom: 12,
    });
    loadRentals();
}

function loadRentals() {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/A1:G100?key=YOUR_API_KEY')
        .then(response => response.json())
        .then(data => {
            const rentals = data.values; // Asegúrate de que los datos estén correctamente organizados
            rentals.forEach(rental => {
                const [telefono, direccion, precio, ambientes, habitaciones, mascotas, foto, lat, lng] = rental;
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
                    map: map,
                    title: direccion,
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div>
                            <h3>${direccion}</h3>
                            <p>Precio: ${precio}</p>
                            <p>Ambientes: ${ambientes}</p>
                            <p>Habitaciones: ${habitaciones}</p>
                            <p>¿Permiten mascotas? ${mascotas}</p>
                            <img src="${foto}" alt="Foto del alquiler" style="width: 100px; height: 100px;">
                        </div>
                    `,
                });

                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });
                markers.push(marker);
            });
        });
}
