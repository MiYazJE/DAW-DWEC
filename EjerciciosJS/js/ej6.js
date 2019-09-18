/*
    Escribir una función en Javascript que a partir de una fecha, 
    nos devuelva el nombre del mes en castellano.
        Document.write(nombreMes(“10/11/2009”);
        Noviembre
*/

"use strict";

function nombreMes(fecha) {
    if (!isNaN(fecha)) return undefined;
    
    var separador = fecha.split("/");
    if (separador.length != 3) return undefined;
    
    var mes = parseInt(separador[1]);
    
    var nombreMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return nombreMeses[mes - 1];
}

var mes = "10/2/1994";
document.write("<h3>El mes " + mes + " es " + nombreMes(mes) + "</h3>");