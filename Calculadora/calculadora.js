let vacio   = true;
let simbolo = false;
let decimal = false;

window.addEventListener('load', () => {

    let numeros = document.querySelectorAll('.numero');
    let operaciones = document.querySelectorAll('.operacion');
    
    // Insertar eventos a los botonones tipo numero
    for (let boton of numeros) {
        aplicarEventoInsertarNumero(boton); 
        aplicarSombra(boton);
        eliminarSombra(boton);
    }
    
    // Insertar eventos a los botones tipo operaciones
    for (let boton of operaciones) {
        aplicarEventoInsertarOperacion(boton);
        aplicarSombra(boton);
        eliminarSombra(boton);
    }
    
    // Eliminar todo el texto
    document.querySelector('.borrarTodo').addEventListener('click', () => {
        borrarTodo();
    });
    
    // Eliminar el ultimo digito introducido
    document.querySelector('.borrar').addEventListener('click', () => {
        eliminarUltimoCaracter();
    });

    // Calcular si la expresion es correcta, sino no hacer nada
    document.querySelector('.resultado').addEventListener('click', () => {
        calcularResultado();
    });

    // Insertar decimales
    document.querySelector('.decimal').addEventListener('click', () => {
        insertarDecimales();
    });

    // Insertar parentesis
    document.querySelector('.parentesis').addEventListener('click', () => {
        insertarParentesis();
    });

});


function aplicarSombra(boton) {
    boton.addEventListener('click', () => {
        boton.classList.add('sombra');
    });
}

function eliminarSombra(boton) {
    boton.addEventListener('mouseleave', () => {
        boton.classList.remove('sombra');
    });
}

function aplicarEventoInsertarNumero(boton) {
    boton.addEventListener('click', () => {
        let inputText = document.querySelector("input[type='text']");
        if (vacio) {
            inputText.value = '';
            vacio = false;
        }
        inputText.value = inputText.value + boton.innerHTML.trim();
        simbolo = decimal = false;
    });
}

function aplicarEventoInsertarOperacion(boton) {
    boton.addEventListener('click', () => {
        // Si hay ya un simbolo de operacion o hay un decimal mal escrito(0.) no dejamos insertar nada 
        if (!simbolo && !vacio && !decimal) {
            let inputText = document.querySelector("input[type='text']");
            inputText.value = inputText.value + ' ' + boton.innerHTML.trim() + ' ';
            simbolo = true;
        }
    });
}

function borrarTodo() {
    if (!vacio) {
        document.querySelector("input[type='text']").value = '0';
        vacio = true;
    }
}

function eliminarUltimoCaracter() {
    if (!vacio) {
        let inputText = document.querySelector("input[type='text']");
        if (inputText.value.length == 1) {
            inputText.value = '0';
            vacio = true;
        }
        else {
            // Si el ultimo caracter es un espacio eliminar 2 caracteres
            // Esto pasa porque cuando introduzco un operando doy un espacio por estetica :)
            if (inputText.value[inputText.value.length - 1] == ' ') {
                inputText.value = inputText.value.substring(
                    0, inputText.value.length - 2
                );
                if (inputText.value.length == 0) inputText.value = '0';
            }
            else {
                inputText.value = inputText.value.substring(
                    0, inputText.value.length - 1
                );
            }
        }
    }
}

function calcularResultado() {
    if (!vacio) {
        let inputText = document.querySelector("input[type='text']");
        let evaluar = inputText.value;
        try {   
            let res = eval(evaluar.replace('x', '*'));
            inputText.value = res;
        } catch (error) {
            // nothing
        }
    }
}

function insertarDecimales() {
    if (!decimal) {
        let inputText = document.querySelector("input[type='text']");
        inputText.value = inputText.value + '.';
        decimal = true;
        vacio = false;
    }
}

function insertarParentesis() {
    if (!vacio && !decimal && !simbolo) {
        let inputText = document.querySelector("input[type='text']");
        inputText.value = '(' + inputText.value + ')';
    }
}

/*
                **************************
                *       KEY EVENTS       *
                **************************
*/

document.addEventListener('keydown', (key) => {
    console.log(key);
    console.log(key.key);
    let inputText = document.querySelector("input[type='text']");
    if (/^[0-9]$/.test(key.key)) {
        if (vacio) {
            inputText.value = '';
            vacio = false;
        }
        inputText.value = inputText.value + key.key;
        simbolo = decimal = false;
    }
    else if (/^[\/\*\%\-\+]$/.test(key.key)) {
        if (!simbolo && !vacio && !decimal) {
            inputText.value = inputText.value + ' ' + key.key + ' ';
            simbolo = true;
        }
    }
    else if (key.key == 'Enter') {
        if (!vacio) {
            let evaluar = inputText.value;
            try {   
                let res = eval(evaluar.replace('x', '*'));
                inputText.value = res;
            } catch (error) {
                // nothing
            }
        }
    }
    else if (key.key == 'Backspace') {
        if (!vacio) {
            let inputText = document.querySelector("input[type='text']");
            if (inputText.value.length == 1) {
                inputText.value = '0';
                vacio = true;
            }
            else {
                // Si el ultimo caracter es un espacio eliminar 2 caracteres
                // Esto pasa porque cuando introduzco un operando doy un espacio por estetica :)
                if (inputText.value[inputText.value.length - 1] == ' ') {
                    inputText.value = inputText.value.substring(
                        0, inputText.value.length - 2
                    );
                    if (inputText.value.length == 0) inputText.value = '0';
                }
                else {
                    inputText.value = inputText.value.substring(
                        0, inputText.value.length - 1
                    );
                }
            }
        }
    }
    else if (key.key == ')' || key.key == '(') {
        if (!vacio && !decimal && !simbolo) {
            let inputText = document.querySelector("input[type='text']");
            inputText.value = '(' + inputText.value + ')';
        }
    }

});
