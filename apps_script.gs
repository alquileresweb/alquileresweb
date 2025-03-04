// Esta función maneja las solicitudes GET que se hacen a Google Apps Script
function doGet(e) {
  // Define los encabezados CORS para permitir solicitudes desde tu dominio
  var headers = {
    "Access-Control-Allow-Origin": "https://alquileresweb.github.io",  // Cambia este valor a tu dominio si es necesario
    "Access-Control-Allow-Methods": "GET, POST",  // Métodos permitidos
    "Access-Control-Allow-Headers": "Content-Type"  // Encabezados permitidos
  };

  // Aquí procesas la acción solicitada (en este caso, obtener alquileres)
  var action = e.parameter.action;

  if (action == "obtener_alquileres") {
    // Llama a la función que devuelve los alquileres desde tu hoja de Google Sheets
    var alquileres = obtenerAlquileres();

    // Devuelve la lista de alquileres como una respuesta JSON
    return ContentService.createTextOutput(JSON.stringify(alquileres))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeaders(headers);
  }

  // Si no se pasa una acción, devuelve un mensaje de error
  var response = {
    "message": "Acción no válida"
  };

  return ContentService.createTextOutput(JSON.stringify(response))
                       .setMimeType(ContentService.MimeType.JSON)
                       .setHeaders(headers);
}

// Función que obtiene los alquileres desde una hoja de cálculo de Google Sheets
function obtenerAlquileres() {
  // Abre la hoja de cálculo de Google Sheets (cambia este ID con el ID de tu hoja)
  var spreadsheet = SpreadsheetApp.openById("1UaLlghoKp5eF8bonlWGV6EqWg-3K7iee2wG2raneoOI");
  
  // Accede a la hoja de trabajo en donde se almacenan los alquileres (cambia 'Alquileres' si es necesario)
  var sheet = spreadsheet.getSheetByName("Alquileres");

  // Obtiene todos los datos de la hoja (comienza desde la segunda fila para ignorar los encabezados)
  var data = sheet.getDataRange().getValues();
  
  // Array donde almacenaremos los alquileres
  var alquileres = [];
  
  // Procesamos cada fila y la transformamos en un objeto
  for (var i = 1; i < data.length; i++) {
    var alquiler = {
      direccion: data[i][0],
      ambientes: data[i][1],
      precio: data[i][2],
      mascotas: data[i][3] === "Sí",  // Convierte "Sí" o "No" a un valor booleano
      latitud: parseFloat(data[i][4]),  // Asegúrate de que la latitud esté en formato numérico
      longitud: parseFloat(data[i][5])  // Asegúrate de que la longitud esté en formato numérico
    };
    alquileres.push(alquiler);
  }
  
  // Devuelve el array de alquileres
  return alquileres;
}

