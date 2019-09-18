/*
    Escribir una función que extraiga un número especificado de caracteres de un String, 
    empezando por el principio o por el final.
        document.write(“Cristiano Ronaldo Apesta”, 4, fin);
        Resultado: esta
*/

"use strict";

// function that receives a string, an index and a string that indicates from 
// where has to cut de string, "from" can be "start" or "end". 
function mySubstring(str, index, from) {
    if (str.length == 0) return "";
    if (from != "end" && from != "start") {
        throw new Error("'" + from + "' is not expected");
    }
    if (from === "end") return str.substring(str.length - index, str.length);
    if (from === "start") return str.substring(0, index);
}

var str = "Cristiano Ronaldo es el mejor";
document.write( "<h1>" + mySubstring(str, 20, "end") + "<h1>" );
