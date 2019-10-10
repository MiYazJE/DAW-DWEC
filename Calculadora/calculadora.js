var vacio = true;
var simbolo = false;
var decimal = false;

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
        if (!vacio) {
            document.querySelector("input[type='text']").value = '0';
            vacio = true;
        }
    });
    
    // Eliminar el ultimo digito introducido
    document.querySelector('.borrar').addEventListener('click', () => {
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
                }
                else {
                    inputText.value = inputText.value.substring(
                        0, inputText.value.length - 1
                    );
                }
            }
        }
    });

    // Calcular si la expresion es correcta, sino no hacer nada
    document.querySelector('.resultado').addEventListener('click', () => {
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
    });

    // Insertar decimales
    document.querySelector('.decimal').addEventListener('click', () => {
        if (!decimal) {
            let inputText = document.querySelector("input[type='text']");
            inputText.value = inputText.value + '.';
            decimal = true;
            vacio = false;
        }
    });

    // Insertar parentesis
    document.querySelector('.parentesis').addEventListener('click', () => {
        if (!vacio && !decimal && !simbolo) {
            let inputText = document.querySelector("input[type='text']");
            inputText.value = '(' + inputText.value + ')';
        }
    });

});

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