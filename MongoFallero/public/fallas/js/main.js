
import Mapa from './mapa.js';

const creacionEventoBusqueda = () => {
    document.querySelector('.buscadorFalla').onchange = cargarFallas;
}

const abrirUbicacion = (btn) => {
    
    let nombreFalla = btn.getAttribute('nombreFalla');
    let coordenadas = mapFallas.get(nombreFalla);

    mapa.modificarCoordenadas(coordenadas);

    let contenedorMapa = document.querySelector('#contenedorMapa');

    contenedorMapa.style.display = 'block';
    contenedorMapa.style.opacity = 1;

    // Eliminar scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';

    document.querySelector('#myMap').onclick = (e) => {
        e.stopPropagation();
    };

    contenedorMapa.onclick = () => {
        document.documentElement.style.overflow = 'auto';
        document.body.scroll = 'yes';
        contenedorMapa.style.opacity = 0;
        contenedorMapa.style.display = 'none';
    };

}

const creacionEventosTipoFalla = () => {

    const radioFallaPrincipal = document.querySelector('.radioFallaPrincipal');
    const radioFallaInfantil  = document.querySelector('.radioFallaInfantil');

    radioFallaPrincipal.onchange = cargarFallas;
    radioFallaInfantil.onchange  = cargarFallas;
}

const insertarFalla = (nombreFalla, srcFoto, anyoFundada, tipoFalla, artista) => {
    contenedorFallas.innerHTML += `
        <div class="falla">
            <p class="nombreFalla">${nombreFalla}</p>
            <img class="fotoFalla" src="${srcFoto}" alt="Foto de la falla ${nombreFalla}">
            <p>${artista}</p>
            <p>Año fundada: ${anyoFundada}</p>
            <p>Falla ${tipoFalla}</p>
            <button nombreFalla="${nombreFalla}" class="btnUbicacion">Ubicación</button>
        </div>`;
}

// Obtener los años de la primera y la ultima falla creada
const getMinAndMaxYear = () => {

    let minYear = 3000;
    let maxYear = -1;
    let year;

    fallas.map(falla => {
        year = parseInt(falla.anyo_fundacion);
        if (year) {
            minYear = Math.min(year, minYear);
            maxYear = Math.max(year, maxYear);
        }
    });

    return { minYear, maxYear };
}

const insertarComboBoxFundacion = () => {

    let years = getMinAndMaxYear();

    const inputDesde = document.querySelector('.anyoDesde');
    const inputHasta = document.querySelector('.anyoHasta');

    inputDesde.min = inputDesde.value = years.minYear;
    inputDesde.max = years.maxYear;

    inputHasta.min = years.minYear;
    inputHasta.max = inputHasta.value = years.maxYear;

    inputDesde.onchange = () => {
        inputHasta.min = inputHasta.value = inputDesde.value;
        cargarFallas();
    }

    inputHasta.onchange = cargarFallas;

    inputDesde.placeholder = `Desde ${years.minYear}`;
    inputHasta.placeholder = `Hasta ${years.maxYear}`;
}

const insertarComboBoxRegiones = (regiones) => {
    
    const comboRegiones = document.querySelector('.comboRegiones');
    let set = new Set();
    
    regiones.forEach(region => set.add(region));

    // Ordenar las regiones
    set = Array.from(set).sort();

    set.forEach(region => {
        if (region.length != 0) {
            let option = document.createElement('option');
            option.text = option.value = region;
            comboRegiones.add(option);
        }
    })

    comboRegiones.onchange = cargarFallas;
}

const cargarFallas = () => {

    const comboSector = document.querySelector('.comboRegiones');
    let sector = comboSector.options[comboSector.selectedIndex].value;

    let anyoDesde = document.querySelector('.anyoDesde').value;
    let anyoHasta = document.querySelector('.anyoHasta').value;

    let fallaBuscada = document.querySelector('.buscadorFalla').value;
    fallaBuscada = fallaBuscada.toLowerCase();

    let fallasFiltradas = fallas.filter(falla =>  {
        if (falla.anyo_fundacion && falla.sector) {
            return ((sector === 'all' || falla.sector === sector) && 
                    falla.anyo_fundacion >= anyoDesde && 
                    falla.anyo_fundacion <= anyoHasta &&
                    falla.nombre.toLowerCase().includes(fallaBuscada));
        }
        return false;
    });

    // Ordenar alfabeticamente las fallas
    fallasFiltradas.sort((falla1, falla2) => falla1.nombre.localeCompare(falla2.nombre));

    // Limpiamos las anteriores busquedas
    contenedorFallas.innerHTML = '';

    // Obtener que tipo de falla esta seleccionada
    const radioFallaPrincipal = document.querySelector('.radioFallaPrincipal');
    const radioFallaInfantil  = document.querySelector('.radioFallaInfantil');

    fallasFiltradas.map(falla => {
        if (radioFallaPrincipal.checked) {
            let artista = (falla.artista.length != 0) ? `Artista: ${falla.artista}` : 'Artista desconocido';
            insertarFalla(falla.nombre, falla.boceto, falla.anyo_fundacion, 'PRINCIPAL', artista);
        }
        if (radioFallaInfantil.checked) {
            let artista = (falla.artista_i.length != 0) ? `Artista: ${falla.artista_i}` : 'Artista desconocido'; 
            insertarFalla(falla.nombre, falla.boceto_i, falla.anyo_fundacion_i, 'IFANTIL', artista);
        }
    });

    // Aplicar eventos al boton de abrir ubicación
    document.querySelectorAll('.btnUbicacion').forEach(btn => btn.onclick = () => abrirUbicacion(btn));
}

const cargarInformacionInputs = (regiones) => {

    insertarComboBoxRegiones(regiones);
    insertarComboBoxFundacion();
    creacionEventosTipoFalla();
    creacionEventoBusqueda();
}

const obtenerFallas = async () => {

    const response = await fetch(URL);
    const json     = await response.json();
    
    // Obtener todas las propiedades del objeto
    fallas = json.features.map(element => {
        mapFallas.set(element.properties.nombre, element.geometry.coordinates);
        return element.properties;
    });
    
    const regiones = fallas.map(element => element.sector);

    cargarInformacionInputs(regiones);
}

const init = async () => {await obtenerFallas(); console.log(fallas)};

const URL = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
let fallas;
// Almacena => clave: nombreFalla, valor: coordenadas
const mapFallas = new Map();
const contenedorFallas = document.querySelector('#contenedorFallas');

let mapa = new Mapa('myMap');
mapa.crearMapa();

window.onload = init;