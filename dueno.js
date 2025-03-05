// Función para verificar el inicio de sesión del dueño
async function verificarLogin(idUnico) {
  const url = "https://script.google.com/macros/s/AKfycbwY8AKiXi93JEbHe-Hf58fXOPJaTNLl8RNJGOq2LmyVdCLA5IzwSyPQIG-AKXuVhqiDiA/exec";
  const params = new URLSearchParams({ action: "verificarLogin", idUnico });

  const response = await fetch(`${url}?${params}`);
  const data = await response.json();

  if (data.existe) {
    console.log("Bienvenido, " + data.nombre);
  } else {
    console.log("ID no encontrado");
  }
}

// Función para registrar un nuevo dueño
async function registrarDueno(nombre, email, telefono) {
  const url = "https://script.google.com/macros/s/AKfycbwY8AKiXi93JEbHe-Hf58fXOPJaTNLl8RNJGOq2LmyVdCLA5IzwSyPQIG-AKXuVhqiDiA/exec";
  const formData = new FormData();
  formData.append("action", "registrarDueno");
  formData.append("nombre", nombre);
  formData.append("email", email);
  formData.append("telefono", telefono);

  const response = await fetch(url, { method: "POST", body: formData });
  const idGenerado = await response.text();
  console.log("ID registrado:", idGenerado);
}

// Función para cargar los alquileres del dueño
async function cargarMisAlquileres(idDueno) {
  const url = `https://script.google.com/macros/s/AKfycbwY8AKiXi93JEbHe-Hf58fXOPJaTNLl8RNJGOq2LmyVdCLA5IzwSyPQIG-AKXuVhqiDiA/exec?action=obtenerMisAlquileres&idDueno=${idDueno}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log("Mis alquileres:", data);
}
