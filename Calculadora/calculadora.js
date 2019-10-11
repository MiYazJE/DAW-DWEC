let isEmpty   = true;
let hayOperando = false;
let hayDecimal = false;
let valid = false;
let concatenarResultado = false;

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

    // Insertar hayDecimales
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
        insertarNumero(boton.innerHTML.trim());
    });
}

function insertarNumero(texto) {
    let inputText = document.querySelector("input[type='text']");
    if (isEmpty || concatenarResultado) {
        inputText.value = '';
        isEmpty = false;
        concatenarResultado = false;
    }
    if(hayOperando) texto = ' ' + texto;
    inputText.value = inputText.value.trim() + texto;
    hayOperando = false;
    valid = true;
}

function aplicarEventoInsertarOperacion(boton) {
    boton.addEventListener('click', () => {
       insertarOperacion(boton.innerHTML.trim());
    });
}

function insertarOperacion(operando) {
     // Si hay ya un hayOperando de operacion o hay un hayDecimal mal escrito(0.) no dejamos insertar nada 
     if (!hayOperando && !isEmpty && (!hayDecimal || valid)) {
        let inputText = document.querySelector("input[type='text']");
        inputText.value = inputText.value.trim() + ' ' + operando + ' ';
        hayOperando = true;
        concatenarResultado = valid = hayDecimal = false;
    }
}

function borrarTodo() {
    if (!isEmpty) {
        document.querySelector("input[type='text']").value = '0';
        isEmpty = true;
        hayDecimal = hayOperando = false;
    }
}

function eliminarUltimoCaracter() {
    if (!isEmpty) {
        let inputText = document.querySelector("input[type='text']");
        if (inputText.value.length == 1) {
            inputText.value = '0';
            isEmpty = true;
            hayOperando = hayDecimal = concatenarResultado = false;
        }
        else {
            // Si el ultimo caracter es un espacio eliminar 2 caracteres
            // Esto pasa porque cuando introduzco un operando doy un espacio por estetica :)
            let eliminado;
            if (inputText.value[inputText.value.length - 1] == ' ') {
                eliminado = inputText.value.substring(inputText.value.length - 2);
                inputText.value = inputText.value.substring(
                    0, inputText.value.length - 2
                );
                if (inputText.value.length == 0) inputText.value = '0';
            }
            else {
                eliminado = inputText.value.substring(inputText.value.length-1);
                inputText.value = inputText.value.substring(
                    0, inputText.value.length - 1
                );
            }
            if (eliminado.includes(')')) inputText.value = inputText.value.substring(1);
            else if (eliminado.includes('.')) hayDecimal = false;
            else if (!/^[0-9]$/.test(eliminado.trim())) {
                console.log(eliminado);
                if (inputText.value.length != 1) hayOperando = false; 
            }
        }
    }
}

function calcularResultado() {
    if (!isEmpty) {
        let inputText = document.querySelector("input[type='text']");
        let evaluar = inputText.value;
        try {   
            let res = eval(evaluar.replace('x', '*'));
            inputText.value = res;
            concatenarResultado = true;
            hayOperando = hayDecimal = false;
        } catch (error) {
            // nothing
        }
    }
}

function insertarDecimales() {
    if (!hayDecimal && !hayOperando) {
        let inputText = document.querySelector("input[type='text']");
        inputText.value = inputText.value + '.';
        hayDecimal = true;
        isEmpty = concatenarResultado = hayOperando = false;
    }
}

function insertarParentesis() {
    if (!isEmpty && !hayDecimal && !hayOperando) {
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

    let inputText = document.querySelector("input[type='text']");
    if (/^[0-9]$/.test(key.key)) {
        insertarNumero(key.key);
    }
    else if (/^[\/\*\%\-\+]$/.test(key.key)) {
        let op = (key.key == '*') ? 'x' : key.key;
        insertarOperacion(op);
    }
    else if (key.key == 'Enter') {
        calcularResultado();
    }
    else if (key.key == 'Backspace') {
        eliminarUltimoCaracter();
    }
    else if (key.key == ')' || key.key == '(') {
        insertarParentesis();
    }
    else if (key.key == '.') {
        insertarDecimales();
    }
    else if (key.key == 'Escape') {
        borrarTodo();
    }

});
