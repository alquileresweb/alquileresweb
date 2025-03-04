let map;

// Función para cargar los alquileres
async function cargarAlquileres() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxmoiEnvG-x-Ium5QBAuADIPYI_rIy5Y-azdHDQnpmczlEWSTkHNxRge2VvXxR0MR2x/exec?action=obtener_alquileres');
    const alquileres = await response.json();

    if (alquileres.length > 0) {
      alquileres.forEach(alquiler => {
        new google.maps.Marker({
          position: { lat: alquiler.latitud, lng: alquiler.longitud },
          map: map,
          title: alquiler.direccion
        });
      });
    } else {
      console.log("No se encontraron alquileres.");
    }
  } catch (error) {
    console.error("Error al obtener los alquileres:", error);
  }
}

// Inicializar el mapa
function inicializarMapa() {
  const mapaSantoTome = {
    lat: -29.0296, // Latitud de Santo Tomé
    lng: -57.3801  // Longitud de Santo Tomé
  };

  // Crear el mapa centrado en Santo Tomé
  map = new google.maps.Map(document.getElementById("mapa"), {
    zoom: 12, // Nivel de zoom adecuado
    center: mapaSantoTome // Coordenadas de Santo Tomé
  });

  // Cargar los alquileres en el mapa
  cargarAlquileres();
}

// Cargar la API de Google Maps y llamar a la función inicializarMapa
function cargarAPI() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCXPX52c062dXYvJBITx6gjd2qDcbvi_G0&callback=inicializarMapa&v=weekly`;
  script.async = true;
  script.defer = true;
  script.onerror = function() {
    console.error("Hubo un error al cargar la API de Google Maps.");
  };
  document.head.appendChild(script);
}

// Ejecutar la carga de la API cuando se cargue la página
window.onload = cargarAPI;
