document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch("URL_DEL_GOOGLE_APPS_SCRIPT", {
        method: "POST",
        body: JSON.stringify({ tipo: "dueño", nombre: nombre, email: email, telefono: "", password: password })
    })
    .then(response => response.text())
    .then(data => alert(data));
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    fetch("URL_DEL_GOOGLE_APPS_SCRIPT", {
        method: "POST",
        body: JSON.stringify({ tipo: "dueño", email: email, password: password })
    })
    .then(response => response.text())
    .then(data => alert(data));
});
