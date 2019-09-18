'use strict';

function esFeliz(n) {

    if (parseInt(n) == 1) return true;
    if (parseInt(n / 10) == 0) return false;
    
    var newNum = 0;
    while (parseInt(n) !== 0) {
        var lastNum = parseInt(n % 10);
        // console.log("lastNum: " + lastNum);
        newNum += parseInt(lastNum * lastNum);
        n /= 10;
    }
    // console.log("newNum: " + newNum);
    return esFeliz(newNum);
}

var numerosFelizes = [];
var i = 1;
while (numerosFelizes.length != 5) {
    if (esFeliz(i)) {
        numerosFelizes.push(i);
        console.log(i);
    }
    i++;
}

document.write("<h1>Numeros Felices</h1>");
var sol = numerosFelizes.join('-');
document.write("<strong>" + sol + " </strong>");
console.log(numerosFelizes);