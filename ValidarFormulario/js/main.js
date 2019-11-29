
function enviarInformacion(form) {

    const data = getFormData(form);

    let init = {
        method: 'POST',
        body: data
    };

    const request = new Request('php/ValidarFormulario.php', init);
    
    fetch(request)
        .then(response => response.json())
        .then(data => {
            if (data === 'error') 
                notificarMensaje('Problemas al realizar la consulta.', 'red');
            else 
                notificarMensaje('Consulta correctamente realizada.', 'green');
        })
        .catch(error => console.error(error));
}

const getFormData = (form) => {
    const data = new FormData();
    Object.keys(form).map(input => data.append(input, form[input]))
    return data;
}

function notificarMensaje(mensaje, color) {
    const divMensaje = document.querySelector('#notificacionConsulta');
    divMensaje.style.backgroundColor = color;
    divMensaje.innerHTML = mensaje;
    divMensaje.classList.add('aparecer');
    divMensaje.addEventListener('animationend', () => {
        divMensaje.classList.remove('aparecer');
        if (color === 'green') clearInputs();
    })
}

function clearInputs() {
    document.querySelectorAll('input').forEach(input => input.value = '');
}

document.querySelector('.submit').onclick = () => {

    let nombre           = inputNombre.value.trim();
    let apellidos        = inputApellidos.value.trim();
    let telefono         = inputTelefono.value.trim();
    let mail             = inputEmail.value.trim();
    let dni              = inputDni.value.trim();
    let password         = inputPassword.value.trim();
    let passwordRepetida = inputPasswordRepetida.value.trim();

    if (nombre && apellidos && mail && dni && password && passwordRepetida) {
        enviarInformacion({ nombre, apellidos, telefono, mail, dni, password });
    }
    else {
        // Existen campos vacios

    }

}

const inputNombre           = document.querySelector('.nombre');
const inputApellidos        = document.querySelector('.apellidos');
const inputTelefono         = document.querySelector('.telefono');
const inputEmail            = document.querySelector('.mail');
const inputDni              = document.querySelector('.dni');
const inputPassword         = document.querySelector('.password');
const inputPasswordRepetida = document.querySelector('.passwordRepetida');
