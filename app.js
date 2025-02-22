// Lógica para el formulario de los dueños (formulario_dueños.html)
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();

    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const precio = document.getElementById('precio').value;
    const ambientes = document.getElementById('ambientes').value;
    const habitaciones = document.getElementById('habitaciones').value;
    const mascotas = document.getElementById('mascotas').value;
    const foto = document.getElementById('foto').value;

    // Aquí deberías enviar los datos a Google Sheets o a tu backend para almacenarlos
    // Por ejemplo, con fetch o con la API de Google Sheets
    fetch('https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/SHEET_RANGE:append?valueInputOption=RAW&key=YOUR_API_KEY', {
        method: 'POST',
        body: JSON.stringify({
            values: [
                [telefono, direccion, precio, ambientes, habitaciones, mascotas, foto]
            ]
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Propiedad añadida correctamente');
    })
    .catch(error => {
        console.error('Error al agregar propiedad:', error);
    });
});
