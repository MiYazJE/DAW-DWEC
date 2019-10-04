'use strict';

function eliminarNodo(button) {
    let root = button.parentNode.parentNode;
    root.removeChild(button.parentNode);
}

function aplicarHover(caja) {
    caja.style.borderRadius = '200px';
    caja.style.transition = '3s';
}

function removeHover(caja) {
    caja.style.borderRadius = '0px';
}

function aplicarSombrasInteriores(caja) {
    if (caja.classList.contains('sombraInterior'))
        caja.classList.remove('sombraInterior');
    else 
        caja.classList.add('sombraInterior');
}

function quitarSombra(caja) {
    if (caja.classList.contains('sombra'))
        caja.classList.remove('sombra');
    else
        caja.classList.add('sombra');
}