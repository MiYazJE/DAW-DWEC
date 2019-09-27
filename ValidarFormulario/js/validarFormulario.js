'use strict';

var errores = [];
const ERROR_NOMBRE = "El nombre solo debe contener carácteres y espacios";
const ERROR_APELLIDOS = "Los apellidos solo deben contener carácteres y espacios";
const ERROR_EMAIL = "El email debe de contener este formato 'xxx@xxx.xxx' ";
const ERROR_DNI = "El dni debe de contener 8 digitos seguidos de una letra";
const ERROR_PASSWORD = `La contrasña debe contener al menos 1 digito, un carácter especial, 
                        y debe de ser al menos de 8 caracteres.`;
const ERROR_PASSWORD_NO_COINCIDE = "Las contraseñas no coinciden.";
const ERROR_DIRECCION_IP = "La dirección ip debe contener el siguiente formato: 'xxx.xxx.xxx.xxx' y el rango entre 1-253, ambos incluidos.";
let password;

function setBorder(input, color) {
    input.style.border = `1px solid ${color}`;
}

function validarNombre(input) {
    if (/^[a-zA-Z\s]{3,20}$/g.test(input.value)) {
        setBorder(input, "green");
    }
    else {
        setBorder(input, "red");
        errores.push(ERROR_NOMBRE);
    }
}

function validarApellidos(input) {
    if (/^[a-zA-Z\s]{3,40}$/g.test(input.value)) {
        setBorder(input, "green");
    }
    else {
        setBorder(input, "red");
        errores.push(ERROR_APELLIDOS);
    }
}

function validarEmail(input) {
    let regExp = /^[0-9-a-zA-Z.!_~-]{5,30}\@[0-9-a-zA-Z.!_~-]{5,30}\.[a-zA-Z]{2,5}$/g;
    if (regExp.test(input.value)) {
        setBorder(input, "green");
    }
    else {
        setBorder(input, "red");
        errores.push(ERROR_EMAIL);
    }
}

function validarDni(input) {
    let dni = input.value;
    if (/^[0-9]{8}[a-z]$/gi.test(dni)) {
        setBorder(input, "green");
        input.value = formatearDni(dni);
    }
    else {
        setBorder(input, "red");
        errores.push(ERROR_DNI);
    }
}

function formatearDni(dni) {
    let dniFormat = "";
    dniFormat += dni.substring(0, 3) + ':';
    dniFormat += dni.substring(3, 6) + ':';
    dniFormat += dni.substring(6, 8);
    return dniFormat.concat('-' + dni.substring(8).toUpperCase());
}

function validarPassword(input) {
    console.log(password);
    if (typeof password != 'undefined' && password != input.value) {
        setBorder(input, 'red');
        errores.push(ERROR_PASSWORD);
    }
    else if (password == input.value) {
        setBorder(input, 'green');
    }
    else {
        let regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/;
        if (regExp.test(input.value)) {
            setBorder(input, "green");
            this.password = input.value;
        }
        else {
            setBorder(input, "red");
            errores.push(ERROR_PASSWORD);
        }
    }
}

function validarDireccionIp(input) {
    let regExp = /^((25[0-4]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9])\.){3}(25[0-4]|2[0-4][0-9]|[1-9][0-9]|[1-9])$/igm;
    if (regExp.test(input.value)) {
        setBorder(input, 'green');
    }
    else {
        setBorder(input, 'red');
        errores.push(ERROR_DIRECCION_IP);
    }
}