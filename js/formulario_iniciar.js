//Validar Formulario iniciar sesion

//Variables 
const correo = document.querySelector("#correo");
const contraseña = document.querySelector("#contraseña");
const formulario = document.querySelector("#formulario");
const btnEntrar = document.querySelector("#boton__entrar");

const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventos();
//Funcion de eventos
function eventos() {

    document.addEventListener("DOMContentLoaded", iniciarApp);

    correo.addEventListener("blur", validarFormulario)
    contraseña.addEventListener("blur", validarFormulario)

}

function iniciarApp(e) {
    e.preventDefault();
    btnEntrar.disabled = true;
    btnEntrar.style.cursor = "not-allowed"
}

function validarFormulario(e) {

    if (e.target.value.length > 0) {
        const error = document.querySelector(".error");
        if (error) {
            error.remove();
        }

    } else {
        mostrarError("TODOS LOS CAMPOS SON OBLIGATORIOS")
    }

    //Validar si es un correo
    if (e.target.type === "email") {

        if (expresionRegular.test(correo.value)) {
            
        } else {
            mostrarError("CORREO NO VALIDO")
        }
    }

    if (correo.value.length > 0 && contraseña.value.length > 0) {
        e.preventDefault();
        btnEntrar.disabled = false;
        btnEntrar.style.cursor = "pointer"
        btnEntrar.style.backgroundColor = "purple";
        
    }
}

//Funcion mostrar Error
function mostrarError(mensaje) {
    const error = document.createElement("P");
    error.classList.add("error")
    error.textContent = mensaje;
    error.style.color = "red";

    //Evitar que se dupliquen los errores
    const errores = document.querySelectorAll(".error");
    if (errores.length === 0) {
        formulario.appendChild(error);
    }

}