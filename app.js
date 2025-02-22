// Lógica para el formulario de los dueños (formulario_dueños.html)
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const direccion = document.getElementById('direccion').value;
    const precio = document.getElementById('precio').value;
    const habitaciones = document.getElementById('habitaciones').value;
    const permiteMascotas = document.getElementById('permiteMascotas').value;
    const foto = document.getElementById('foto').value;

    // Aquí deberías enviar los datos a Google Sheets o a un backend para almacenarlos
    // Por ejemplo, con fetch o con la API de Google Sheets
    console.log({ direccion, precio, habitaciones, permiteMascotas, foto });
    
    alert('Propiedad agregada correctamente');
});
