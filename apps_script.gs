function doGet(e) {
  // Permitir solicitudes de cualquier dominio (CORS)
  var response = HtmlService.createHtmlOutput("Hello, world!")
    .setXContentTypeOptions("nosniff");
  response.addHeader("Access-Control-Allow-Origin", "*");
  response.addHeader("Access-Control-Allow-Methods", "GET, POST");
  response.addHeader("Access-Control-Allow-Headers", "Content-Type");

  // Aquí puedes agregar el resto del código para procesar la solicitud
  var action = e.parameter.action;
  
  if (action == "obtener_alquileres") {
    return obtenerAlquileres();  // Llama a la función para obtener los alquileres
  }

  return response;
}

function obtenerAlquileres() {
  // Aquí tu lógica para obtener los alquileres, por ejemplo:
  var alquileres = [
    { latitud: -29.0296, longitud: -57.3801, direccion: "Santo Tomé, Corrientes" },
    // Agrega más alquileres aquí
  ];

  return ContentService.createTextOutput(JSON.stringify(alquileres))
      .setMimeType(ContentService.MimeType.JSON);
}
