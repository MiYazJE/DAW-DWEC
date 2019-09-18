/*
    Escribe un programa en Javascript para que muestre el siguiente patrón
    *
    * *
    * * *
    * * * *
    …
    * * * * * * * * * *
*/

'use strict';

function pintarPiramide(n) {
    var start = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < start; j++) 
            document.write("*");
        document.write("<br>");
        start++;
    }
}

pintarPiramide(50   );