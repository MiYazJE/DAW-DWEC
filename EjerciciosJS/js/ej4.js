/*
 Escribir una función a la que le pasemos un argumento y
 nos indique si este es un objeto Date o no.
*/

"use strict";

function isDate(date) { 
    return date instanceof Date; 
}

var fechaDate = new Date();
var fecha = "10/09/2019";

document.write("<h1><p align='center'>");
document.write( isDate(fecha) ? "Es un objeto Date" : "No es un objeto Date" );
document.write("</p></h1>");