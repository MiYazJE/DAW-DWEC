/*
Realizar una aplicación que pida un dni, una dirección de correo, un número de teléfono, una IP, y una
URL válida (incluyendo el protocolo), y que devuelva si tienen formato correcto.
Ten en cuenta que en el DNI, no solo tiene que comprobar si el formato es correcto, si no que también
tiene que comprobar si la letra concuerda con la serie numérica.

1.- Pedir dni, correo electronico, numero de telefono, direccion IP y  una url valida.
2.- Validar cada uno de los campos y notificar si hay errores.
*/

'use strict';

function validarDni(dni) {

    if (!/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/g.test(dni)) 
        return false;

    var abc = ["T", "R", "W", "A", "G", "M", "Y", "F",
    "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V",
    "H", "L", "C", "K", "E"];

    var numDni = dni.substring(0, 8);
    var calculoLetra = parseInt(numDni % 23);
    var letraExtraida = abc[calculoLetra];
    
    console.log(letraExtraida);
    return letraExtraida === dni.charAt(dni.length - 1);
}

function validarEmail(email) {
    return (/^[a-zA-Z0-9.!?-]{2,60}\@[a-zA-Z0-9.!?-]{3,15}\.[a-zA-Z0-9.!?-]{2,10}$/g.test(email));
}

function validarTelefono(telefono) {
    return /^[0-9]{9}$/.test(telefono);
}

function validarIp(direccionIP) {
    return /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9])$/igm.test(direccionIP);
}

function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch(e) { return false; }
}

// LECTURA 
// var dni      = prompt("Introduce un dni");
// var email    = prompt("Introduce un email");
// var telefono = prompt("Introduce un telefono");
// var ip       = prompt("Introduce una direccion ip");
// var url      = prompt("Introduce una url valida");

// VALIDACIONES
// document.write("<h1>");
// document.write( validarDni(dni) ? "El dni es correcto," : "El dni no es correcto.");
// document.write( validarEmail(email) ? "El email es correcto." : "El email no es correcto");
// document.write( validarTelefono(telefono) ? "El telefono es valido" : "El telefono no es valido" );
// document.write( validarIp(ip) ? "La direccion ip es valida" : "La direccion ip no es valida" );
// document.write( validateUrl(url) ? "La url es valida" : "La url no es valida" );
// document.write("</h1>");

/*
var ips = ["192.68.35.35","0.0.0.0","255.0.0.0","192.168.1.0","192.168.0.1","255.255.255.0","1.1.1.1","255.255.255.255","249.249.249.249","200.200.200.200","199.199.199.199","100.100.100.100","99.99.99.99","0.0.0.0","9.9.9.9","10.10.10.10","99.99.99.99","100.100.100.100","109.109.109.109","110.110.110.110","199.199.199.199","200.200.200.200","249.249.249.249","250.250.250.250","255.255.255.255","256.256.256.260","192.168.0.0/24","192.168..1","192.168.1","1","1.","1.1","1.1.","1.1.1","1.1.1.","1.1.1.1.","1.1.1.1.1",".1.1.1.1","01.01.01.01","09.09.09.09","1.0.0.1.0","010.1.1.1","123456","123123123123",".127.0.0.1"];

document.write("<ul>");
ips.forEach((ip) => {
    if (validarIp(ip)) document.write("<li>" + ip + "</li>");
});
document.write("</ul>");
*/
