// Esta función se ejecuta cuando se llama al script de Google Apps (via Fetch API)
function doGet(e) {
    const action = e.parameter.action;

    if (action === "registrar") {
        return registrarUsuario(e);
    } else if (action === "login") {
        return loginUsuario(e);
    } else if (action === "obtener_alquileres") {
        return obtenerAlquileres();
    }
}

// Registrar un nuevo usuario en la hoja de Google Sheets
function registrarUsuario(e) {
    const nombre = e.parameter.nombre;
    const email = e.parameter.email;
    const telefono = e.parameter.telefono;
    const password = e.parameter.password;

    const sheet = SpreadsheetApp.openById("1UaLlghoKp5eF8bonlWGV6EqWg-3K7iee2wG2raneoOI").getSheetByName("Usuarios");
    sheet.appendRow([nombre, email, telefono, password]);

    return ContentService.createTextOutput("Usuario registrado con éxito");
}

// Iniciar sesión del usuario
function loginUsuario(e) {
    const email = e.parameter.email;
    const password = e.parameter.password;

    const sheet = SpreadsheetApp.openById("1UaLlghoKp5eF8bonlWGV6EqWg-3K7iee2wG2raneoOI").getSheetByName("Usuarios");
    const users = sheet.getDataRange().getValues();

    for (let i = 1; i < users.length; i++) {
        if (users[i][1] === email && users[i][3] === password) {
            return ContentService.createTextOutput("login exitoso");
        }
    }

    return ContentService.createTextOutput("Credenciales incorrectas");
}

// Obtener los alquileres desde la hoja de Google Sheets
function obtenerAlquileres() {
    const sheet = SpreadsheetApp.openById("1UaLlghoKp5eF8bonlWGV6EqWg-3K7iee2wG2raneoOI").getSheetByName("Alquileres");
    const alquileres = sheet.getDataRange().getValues();
    
    const alquileresJSON = alquileres.map(row => {
        return {
            lat: row[0],           // Latitud
            lng: row[1],           // Longitud
            direccion: row[2],     // Dirección
            ambientes: row[3],     // Cantidad de ambientes
            precio: row[4],        // Precio
            permiteMascotas: row[5]  // Si permite mascotas
        };
    });

    return ContentService.createTextOutput(JSON.stringify(alquileresJSON)).setMimeType(ContentService.MimeType.JSON);
}
