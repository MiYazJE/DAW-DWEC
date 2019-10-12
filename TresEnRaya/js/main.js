'use strict';

let colorPlayer  = '#40FF00';
let colorMaquina = '#FF0000';
let tablero = [];
let ganador = '';

window.addEventListener('load', () => {

    let contenedorMain = document.querySelector('.contenedorMain');

    for (let caja of contenedorMain.children) 
        aplicarEventos(caja);

    for (let i = 0; i < 3; i++) 
        tablero[i] = new Array(3).fill('');

});

function comprobarTablero() {

    // comprobar filas
    if (comprobarFilas('player1')) {
        ganador = 'player1';
        return true;
    }
    else if (comprobarFilas('maquina')) {
        ganador = 'maquina';
        return true;
    }

    // comprobar columnas
    if (comprobarColumnas('player1')) {
        ganador = 'player1';
        return true;
    } 
    else if (comprobarColumnas('maquina')) {
        ganador = 'maquina';
        return true;
    }

    // comprobar diagonales
    if (comprobarDiagonales()) return true;

    return false;
}

function comprobarFilas(player) {
    let filas;
    for (let i = 0; i < 3; i++) {
        filas = true;
        for (let j = 0; j < 3 && filas; j++) {
            filas = (tablero[j][i] == player);
        }
        if (filas) {
            ganador = tablero[i][2];
            return true;
        }
    }
    return false;
}

function comprobarColumnas(player) {
    let columnas;
    for (let i = 0; i < 3; i++) {
        columnas = true;
        for (let j = 0; j < 3 && columnas; j++) {
            columnas = (tablero[i][j] == player);
        }
        if (columnas) {
            ganador = tablero[i][2];
            return true;
        }
    }
    return false;
}

function comprobarDiagonales() {

    if (tablero[0][0] == tablero[1][1] && tablero[1][1] == tablero[2][2]) {
        if (tablero[0][0] == 'player1') ganador = 'player1';
        else if (tablero[0][0] == 'maquina') ganador = 'maquina';
    }
    
    if (tablero[0][2] == tablero[1][1] && tablero[1][1] == tablero[2][0]) {
        if (tablero[1][1] == 'player1') ganador = 'player1';
        else if (tablero[1][1] == 'maquina') ganador = 'maquina';
    }

    return ganador != '' ? true : false;
}

function indicarGanador() {
    console.log('Enhorabuena ' + ganador + ' eres el ganador!');
    let divGanador = document.querySelector('.cajaGanador');
    let h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode('Enhorabuena ' + ganador + ' eres el ganador!'));
    divGanador.appendChild(h1);
} 

function aplicarEventos(caja) {
    caja.addEventListener('click', () => {
        if (ganador == '') {
            let pos = devolverPosicion(caja);
            if (tablero[parseInt(pos/3)][parseInt(pos%3)] == '') {
                // turno player
                tablero[parseInt(pos/3)][parseInt(pos%3)] = 'player1';
                caja.style.backgroundColor = colorPlayer;
                caja.style.cursor = 'default';
                if (comprobarTablero()) indicarGanador();

                // turno cpu
                if (ganador == '') {
                    setTimeout(() => {
                        turnoCpu(caja);
                    }, 1000);
                    if (comprobarTablero()) indicarGanador();
                }
                else if (ganador == '' && comprobarEmpate()) anunciarEmpate();
            }
        }
    });
}

function turnoCpu(caja) {
    while (true) {
        let rnd = Math.floor(Math.random() * 9);
        if (tablero[parseInt(rnd/3)][parseInt(rnd%3)] == '') {
            tablero[parseInt(rnd/3)][parseInt(rnd%3)] = 'maquina';
            caja.parentElement.children[rnd].style.backgroundColor = colorMaquina;
            caja.style.cursor = 'default';
            break;
        }
    }
}

// devuelve la posicion en la que se encuentra el div presionado
function devolverPosicion(caja) {
    let parent = caja.parentElement.children;
    for (let i = 0; i < parent.length; i++) 
        if (caja == parent[i]) 
            return i;
        
}

function comprobarEmpate() {
    let empate = true;

    for (let i = 0; i < 3 && empate; i++) 
        for (let j = 0; j < 3 && empate; j++) 
            empate = (tablero[i][j] != '');

    return empate;
}

function anunciarEmpate() {
    let cajaGanador = document.querySelector('.cajaGanador');
    let h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode('Se ha producido un empate!'));
    cajaGanador.appendChild(h1);
}
