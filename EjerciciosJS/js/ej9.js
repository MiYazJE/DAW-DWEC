/*
    Escribir una función que proteja una dirección de email pasada como argumento.
        document.write(protegerEmail(“diego.garcia@ieslasenia.org”)
        Resultado: diego.g...@ieslasenia.org
*/

"use strict";

function protegerEmail(email) {

    var leftPart  = email.substring(0, email.indexOf("@"));
    var rightPart = email.substring(leftPart.length, email.length); 

    var arrLeftPart = leftPart.split('');

    for (let i = 0; i < arrLeftPart.length; i++) {
        var rnd =Math.floor( Math.random() * 2 );
        if (rnd == 0) arrLeftPart[i] = '.';
    }

    return arrLeftPart.join("").concat(rightPart);
}


var email = "ruben.saizserrano@gmail.com";

document.write("<h1>" + protegerEmail(email) + "</h1>");