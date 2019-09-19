'use strict';

function factorial(n) {
    var sol = n;
    for (let i = n - 1; i > 1; i--) sol *= i;
    return sol;
}

function f(n) {
    if (n <= 1) return n;
    return n * f(n - 1);
}

document.write( f(10) );