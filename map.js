let map;
let alquileres = [];

// Cargar alquileres desde Google Sheets
async function cargarAlquileres() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxmoiEnvG-x-Ium5QBAuADIPYI_rIy5Y-azdHDQnpmczlEWSTkHNxRge2VvXxR0MR2x/exec?action=obtener_alquileres');
    alquileres = await response.json();

    if (alquileres.length > 0) {
      alquileres.forEach(alquiler => {
        new google.maps.Marker({
          position: { lat: alquiler.latitud, lng: alquiler.longitud },
          map: map,
          title: alquiler.direccion,
          infoWindow: new google.maps.InfoWindow({
            content: `
              <h3>${alquiler.direccion}</h3>
              <p>Precio: $${alquiler.precio}</p>
              <p>Habitaciones: ${alquiler.habitaciones}</p>
              <p>¿Permite mascotas? ${alquiler.permite_mascotas ? 'Sí' : 'No'}</p>
            `
          })
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
    lat: -29.0296, // Latitud de Santo Tomé, Corrientes
    lng: -57.3801  // Longitud de Santo Tomé, Corrientes
  };

  map = new google.maps.Map(document.getElementById("mapa"), {
    zoom: 12, // Nivel de zoom adecuado
    center: mapaSantoTome // Coordenadas de Santo Tomé
  });

  // Mostrar los alquileres
  cargarAlquileres();

  // Filtros de búsqueda
  document.getElementById("filtroPrecioMin").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroPrecioMax").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroHabitaciones").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroMascotas").addEventListener("change", aplicarFiltros);
}

// Aplicar filtros de búsqueda
function aplicarFiltros() {
  const precioMin = document.getElementById("filtroPrecioMin").value;
  const precioMax = document.getElementById("filtroPrecioMax").value;
  const habitaciones = document.getElementById("filtroHabitaciones").value;
  const permiteMascotas = document.getElementById("filtroMascotas").value === "si";

  const alquileresFiltrados = alquileres.filter(alquiler => {
    return (
      (precioMin ? alquiler.precio >= precioMin : true) &&
      (precioMax ? alquiler.precio <= precioMax : true) &&
      (habitaciones ? alquiler.habitaciones >= habitaciones : true) &&
      (permiteMascotas ? alquiler.permite_mascotas === permiteMascotas : true)
    );
  });

  // Limpiar los marcadores existentes y añadir los nuevos filtrados
  map.clearOverlays();
  alquileresFiltrados.forEach(alquiler => {
    new google.maps.Marker({
      position: { lat: alquiler.latitud, lng: alquiler.longitud },
      map: map,
      title: alquiler.direccion,
      infoWindow: new google.maps.InfoWindow({
        content: `
          <h3>${alquiler.direccion}</h3>
          <p>Precio: $${alquiler.precio}</p>
          <p>Habitaciones: ${alquiler.habitaciones}</p>
          <p>¿Permite mascotas? ${alquiler.permite_mascotas ? 'Sí' : 'No'}</p>
        `
      })
    });
  });
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

// Funciones para manejar el registro y el login

// Manejo de registro
document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreRegistro").value;
  const email = document.getElementById("emailRegistro").value;
  const password = document.getElementById("passwordRegistro").value;

  // Validar y guardar usuario en localStorage (o en una base de datos real)
  if (nombre && email && password) {
    localStorage.setItem("usuario", JSON.stringify({ nombre, email, password }));
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

// Manejo de login
document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  // Validar credenciales desde localStorage (o desde una base de datos real)
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

  if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
    alert("¡Bienvenido de nuevo, " + usuarioGuardado.nombre + "!");
    // Aquí podrías redirigir al usuario a otra página o permitirle realizar acciones
  } else {
    alert("Correo electrónico o contraseña incorrectos.");
  }
});

// Mostrar alquileres disponibles (para clientes)
document.getElementById("btnVerAlquileres").addEventListener("click", function() {
  // Mostrar el mapa y cargar los alquileres
  document.getElementById("mapa").style.display = "block";
  cargarAlquileres();
  // Ocultar formularios de registro e inicio de sesión
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.querySelector(".botones").style.display = "none";
});

// Mostrar la sección de "Mis alquileres" (para dueños)
document.getElementById("btnMisAlquileres").addEventListener("click", function() {
  // Mostrar el formulario de registro
