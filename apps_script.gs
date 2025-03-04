function doGet(e) {
  // Asegura que CORS esté habilitado
  var response = HtmlService.createHtmlOutput("Hello, world!")
    .setXContentTypeOptions("nosniff");
  
  // Permite solicitudes de cualquier origen (para que puedas acceder desde tu dominio)
  response.addHeader("Access-Control-Allow-Origin", "*");
  response.addHeader("Access-Control-Allow-Methods", "GET, POST");
  response.addHeader("Access-Control-Allow-Headers", "Content-Type");

  var action = e.parameter.action;

  // Dependiendo del valor de 'action', realizar una acción
  if (action == "obtener_alquileres") {
    return obtenerAlquileres();  // Llama a la función que devuelve los alquileres
  }

  return response;
}

function obtenerAlquileres() {
  // Ejemplo de alquileres con latitudes y longitudes de test
  var alquileres = [
    { latitud: -29.0296, longitud: -57.3801, direccion: "Santo Tomé, Corrientes" },
    // Agrega más alquileres aquí si tienes datos reales
  ];

  // Devuelve los alquileres en formato JSON
  return ContentService.createTextOutput(JSON.stringify(alquileres))
      .setMimeType(ContentService.MimeType.JSON);
}
