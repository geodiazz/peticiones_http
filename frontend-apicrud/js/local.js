const d = document;
let nameUser = d.getElementById("nombre-usuario");
let btnLogout = d.getElementById("btnLogout");

d.addEventListener("DOMContentLoaded", () => {
    getUser();
});


//funcion para poner el nombre del usuario
let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.innerHTML = user.usuario;
}

//funcion para cerrar sesion
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userLogin");
    location.href = "login.html";
});