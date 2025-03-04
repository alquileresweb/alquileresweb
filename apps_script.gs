function doPost(e) {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById("TU_SHEET_ID").getSheetByName("Usuarios");

    if (data.action === "registrar") {
        sheet.appendRow([data.nombre, data.email, data.telefono, data.password]);
        return ContentService.createTextOutput("Registro exitoso");
    }

    if (data.action === "login") {
        const rows = sheet.getDataRange().getValues();
        for (let i = 1; i < rows.length; i++) {
            if (rows[i][1] === data.email && rows[i][3] === data.password) {
                return ContentService.createTextOutput(JSON.stringify({ status: "success" }));
            }
        }
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Credenciales incorrectas" }));
    }
}
