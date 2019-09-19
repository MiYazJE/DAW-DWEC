"use strict";

var length = prompt("Introduce el numero de elementos del array");
var arr = [];
var max = Number.MIN_VALUE;

for (let i = 0; i < length; i++) {
    arr.push( prompt("Introduce un elemento en la pos " + i) );
    max = Math.max(arr[i], max);
}

document.write("<h1>El mayor es: " + max + "</h1>");