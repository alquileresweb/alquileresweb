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
    fetch('https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/A1:D100?key=YOUR_API_KEY')
        .then(response => response.json())
        .then(data => {
            const rentals = data.values;
            rentals.forEach(rental => {
                const [address, price, rooms, allowPets, lat, lng, photoUrl] = rental;
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
                    map: map,
                    title: address,
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div>
                            <h3>${address}</h3>
                            <p>Precio: ${price}</p>
                            <p>Habitaciones: ${rooms}</p>
                            <p>¿Permiten mascotas? ${allowPets}</p>
                            <img src="${photoUrl}" alt="Foto del alquiler" style="width: 100px; height: 100px;">
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

document.getElementById("filterBtn").addEventListener("click", function() {
    const rooms = document.getElementById("rooms").value;
    const priceMin = document.getElementById("priceMin").value;
    const priceMax = document.getElementById("priceMax").value;
    const pets = document.getElementById("pets").value;

    markers.forEach(marker => {
        const rental = marker.rentalData;
        if (
            (rooms && rental.rooms !== rooms) ||
            (priceMin && rental.price < priceMin) ||
            (priceMax && rental.price > priceMax) ||
            (pets && rental.allowPets !== pets)
        ) {
            marker.setMap(null);
        } else {
            marker.setMap(map);
        }
    });
});
