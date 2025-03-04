document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const datos = {
        action: "registrar",
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        password: document.getElementById("password").value
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error("Error en el registro:", error));
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const datos = {
        action: "login",
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error("Error en el inicio de sesión:", error));
});
