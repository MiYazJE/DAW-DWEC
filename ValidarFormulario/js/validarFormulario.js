/*
    Rubén Saiz Serrano 01/10/2019
*/

'use strict';


var errores = new Array(6).fill('');

const ERROR_NOMBRE = "El nombre solo debe contener carácteres y espacios";
const ERROR_APELLIDOS = "Los apellidos solo deben contener carácteres y espacios";
const ERROR_EMAIL = "El email debe de contener este formato 'xxx@xxx.xxx' ";
const ERROR_DNI = "El dni debe de contener 8 digitos seguidos de una letra";
const ERROR_PASSWORD = "La contrasña debe contener al menos 1 digito, un carácter especial, y debe de ser al menos de 8 caracteres.";
const ERROR_PASSWORD_NO_COINCIDE = "Las contraseñas no coinciden.";
const ERROR_DIRECCION_IP = "La dirección ip debe contener el siguiente formato: 'xxx.xxx.xxx.xxx' y el rango entre 1-253, ambos incluidos.";

let password;
let compararPasswords = false;

function setBorder(input, color) {  
    input.style.border = `1px solid ${color}`;
}

function validarNombre(input) {
    if (input.value.length == 0) return;
    if (/^[a-zA-Z\s]{3,20}$/g.test(input.value)) {
        setBorder(input, "green");
        errores[0] = 'ok';
    }
    else {
        setBorder(input, "red");
        errores[0] = ERROR_NOMBRE;
    }
}

function validarApellidos(input) {
    if (input.value.length == 0) return;
    if (/^[a-zA-Z\s]{3,40}$/g.test(input.value)) {
        setBorder(input, "green");
        errores[1] = 'ok';
    }
    else {
        setBorder(input, "red");
        errores[1] = ERROR_APELLIDOS;
    }
}

function validarEmail(input) {
    if (input.value.length == 0) return;
    let regExp = /^[0-9-a-zA-Z.!_~-]{5,30}\@[0-9-a-zA-Z.!_~-]{5,30}\.[a-zA-Z]{2,5}$/g;
    if (regExp.test(input.value)) {
        setBorder(input, "green");
        errores[2] = 'ok';
    }
    else {
        setBorder(input, "red");
        errores[2] = ERROR_EMAIL;
    }
}

function validarDni(input) {
    if (input.value.length == 0) return;
    let dni = input.value;
    if (/^[0-9]{8}[a-z]$/gi.test(dni)) {
        setBorder(input, "green");
        input.value = formatearDni(dni);
        errores[3] = 'ok';
    }
    else {
        setBorder(input, "red");
        errores[3] = ERROR_DNI;
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
    if (input.value.length == 0) return;

    if (compararPasswords && input.value != password) {
        setBorder(input, 'red');
        errores[4] = ERROR_PASSWORD_NO_COINCIDE;
    }
    else if (compararPasswords && password == input.value) {
        setBorder(input, 'green');
        compararPasswords = false;
        errores[4] = 'ok';
    }
    else {
        let regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,100}$/;
        if (regExp.test(input.value)) {
            setBorder(input, "green");
            password = input.value;
            compararPasswords = true;
            errores[4] = 'ok';
        }
        else {
            setBorder(input, "red");
            errores[4] = ERROR_PASSWORD;
        }
    }
}

function validarDireccionIp(input) {
    if (input.value.length == 0) return;
    let regExp = /^((25[0-4]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9])\.){3}(25[0-4]|2[0-4][0-9]|[1-9][0-9]|[1-9])$/igm;
    if (regExp.test(input.value)) {
        setBorder(input, 'green');
        errores[5] = 'ok';
    }
    else {
        setBorder(input, 'red');
        errores[5] = ERROR_DIRECCION_IP;
    }
}

function notificarErrores() {
    console.log(errores);
    if (!isCorrect(errores)) {
        console.log(errores);
        console.log("Existen errores");
        let errorsParsed = "";
        
        for (let error of errores) 
            if (error != 'ok' && error != '')    
                errorsParsed += error + '\n';
        
        alert(errorsParsed);
    }
    else if (isEmpty(errores)) {
        console.log("Existen campos vacios");
        alert("Existen campos vacíos, por favor rellenalos.")
    }
    else {
        alert('El formulario no contiene errores.');
    }
}

function isCorrect(errores) {
    for (let error of errores) {
        if (error != 'ok' && error.length != 0) {
            return false;
        }
    }
    return true;
}

function isEmpty(errores) {
    for (let error of errores) {
        if (error.length == 0)
            return true;
    }
    return false;
}
