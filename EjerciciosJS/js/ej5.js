/*
 Escribir una función que devuelva el número de días que tiene un mes indicado. Le pasaremos como
 argumento el número de mes y el número de año.
*/

"use strict";

function obtenerDiaDelMes(mes) {
    var meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return meses[mes - 1];
}

var mes = 12;
document.write("<h3>El mes " + mes + " tiene " + obtenerDiaDelMes(mes) + " dias.</h3>");