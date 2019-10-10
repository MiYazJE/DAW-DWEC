var vacio = true;
var simbolo = false;

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
    for (let boton of (operaciones)) {
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
                inputText.value = inputText.value.substring(
                    0, inputText.value.length - 1
                );
            }
        }
        
    });


});

function aplicarEventoInsertarOperacion(boton) {
    boton.addEventListener('click', () => {
        // Si hay ya un simbolo de operacion no dejamos insertar el siguiente 
        if (!simbolo && !vacio) {
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
        simbolo = false;
    });
}