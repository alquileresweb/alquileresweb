function inicializarMapa() {
    const mapa = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.5375, lng: -68.5364 }, // Coordenadas iniciales (puedes cambiarlas)
        zoom: 12
    });

    fetch(GOOGLE_SCRIPT_URL + "?action=getAlquileres")
        .then(response => response.json())
        .then(datos => {
            datos.forEach(alquiler => {
                new google.maps.Marker({
                    position: { lat: parseFloat(alquiler.lat), lng: parseFloat(alquiler.lng) },
                    map: mapa,
                    title: alquiler.direccion
                });
            });
        })
        .catch(error => console.error("Error al cargar alquileres:", error));
}
