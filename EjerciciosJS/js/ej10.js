/*
    Escribir una función que convierta cualquier String en el formato “camelCase”.
    Document.write(camelCase(“superman es Débil”);
    Resultado: supermanEsDébil
*/

"use strict";

function toCamelCase(str) {
    str = str.trim();
    var separator = str.split(" ");
    var camelStr = separator[0];
    for (let i = 1; i < separator.length; i++) {
        var temp = separator[i].split('');
        for (let j = 0; j < temp.length; j++) {
            if (j == 0) camelStr += temp[j].toUpperCase();
            else camelStr += temp[j];
        }
    }
    return camelStr;
}

var str = "soy el puto amo";
document.write( "<h1>" + toCamelCase(str) + "</h1>" );