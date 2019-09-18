    "use strict";

    var length = prompt("Introduce el numero de elementos del array");
    var arr = [];
    var max = -999999999;

    for (let i = 0; i < length; i++) {
        arr.push( prompt("Introduce un elemento en la pos " + i) );
        if (arr[i] > max) max = arr[i];
    }

    console.log("El mayor es: " + max);