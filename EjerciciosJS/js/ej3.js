/*
Realizar una aplicación que pida un dni, una dirección de correo, un número de teléfono, una IP, y una
URL válida (incluyendo el protocolo), y que devuelva si tienen formato correcto.
Ten en cuenta que en el DNI, no solo tiene que comprobar si el formato es correcto, si no que también
tiene que comprobar si la letra concuerda con la serie numérica.

1.- Pedir dni, correo electronico, numero de telefono, direccion IP y  una url valida.
2.- Validar cada uno de los campos y notificar si hay errores.
*/

"use strict";

function validarDni(dni) {

    var regExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/g;

    if (!regExp.test(dni)) {
        return false;
    }

    var abc = ["T", "R", "W", "A", "G", "M", "Y", "F",
    "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V",
    "H", "L", "C", "K", "E"];

    var numDni = dni.substring(0, 8);
    var calculoLetra = parseInt(numDni % 23);
    var letra = abc[calculoLetra];
    
    console.log(letra);
    return letra === dni.charAt(dni.length - 1);
}

function validarEmail(email) {
    return (email.length > 12 && email.endsWith("@hotmail.com") && email.indexOf(".") == email.length-4) || 
           (email.length > 10 && email.endsWith("@gmail.com") && email.indexOf(".") == email.length-4);
}

function validarTelefono(telefono) {
    var isNumber = true;
    for (let i = 0; i < telefono.length && isNumber; i++) 
        isNumber = !isNaN(telefono.charAt(i));
    return isNumber && telefono.length == 9;
}

function validarIp(direccionIP) {
    var split = direccionIP.split(".");
    return split.length == 4;
}

function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch(e) { return false; }
}

// LECTURA 
var dni      = prompt("Introduce un dni");
// var email    = prompt("Introduce un email");
// var telefono = prompt("Introduce un telefono");
// var ip       = prompt("Introduce una direccion ip");
// var url      = prompt("Introduce una url valida");

// VALIDACIONES
document.write( validarDni(dni) ? "El dni es correcto," : "El dni no es correcto.");
// document.write( validarEmail(email) ? "El email es correcto." : "El email no es correcto");
// document.write( validarTelefono(telefono) ? "El telefono es valido" : "El telefono no es valido" );
// document.write( validarIp(ip) ? "La direccion ip es valida" : "La direccion ip no es valida" );
// document.write( validateUrl(url) ? "La url es valida" : "La url no es valida" );