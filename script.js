// Global variable to store the map instance
let map;

// Initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.6037, lng: -58.3816 }, // Centralize the map (Buenos Aires coordinates)
    zoom: 12
  });
  cargarAlquileres();
}

// Fetch alquileres from Google Apps Script
function cargarAlquileres() {
  fetch('https://script.google.com/macros/s/AKfycbwY8AKiXi93JEbHe-Hf58fXOPJaTNLl8RNJGOq2LmyVdCLA5IzwSyPQIG-AKXuVhqiDiA/exec?action=obtenerAlquileres')
    .then(response => response.json())
    .then(data => {
      data.forEach(alquiler => {
        const alquilerLocation = new google.maps.LatLng(alquiler.latitud, alquiler.longitud);
        const marker = new google.maps.Marker({
          position: alquilerLocation,
          map: map,
          title: alquiler.direccion
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3>${alquiler.direccion}</h3>
              <p>Ambientes: ${alquiler.ambientes}</p>
              <p>Precio: $${alquiler.precio}</p>
              <p>Mascotas: ${alquiler.mascotas}</p>
              <p><a href="https://wa.me/${alquiler.whatsApp}" target="_blank">Contactar por WhatsApp</a></p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    });
}

// Filter alquileres based on user input
function filtrarAlquileres() {
  const ambientes = document.getElementById('ambientes').value;
  const precio = document.getElementById('precio').value;
  const mascotas = document.getElementById('mascotas').value;

  const url = `https://script.google.com/macros/s/AKfycbwY8AKiXi93JEbHe-Hf58fXOPJaTNLl8RNJGOq2LmyVdCLA5IzwSyPQIG-AKXuVhqiDiA/exec?action=filtrarAlquileres&ambientes=${ambientes}&precio=${precio}&mascotas=${mascotas}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Clear existing markers
      map.clearOverlays();
      // Add filtered markers to the map
      data.forEach(alquiler => {
        const alquilerLocation = new google.maps.LatLng(alquiler.latitud, alquiler.longitud);
        const marker = new google.maps.Marker({
          position: alquilerLocation,
          map: map,
          title: alquiler.direccion
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3>${alquiler.direccion}</h3>
              <p>Ambientes: ${alquiler.ambientes}</p>
              <p>Precio: $${alquiler.precio}</p>
              <p>Mascotas: ${alquiler.mascotas}</p>
              <p><a href="https://wa.me/${alquiler.whatsApp}" target="_blank">Contactar por WhatsApp</a></p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    });
}

// Set up event listener for "Soy dueño" button
document.getElementById('soyDuenio').addEventListener('click', function() {
  window.location.href = '/dueno.html';  // Redirige a la página del dueño
});
