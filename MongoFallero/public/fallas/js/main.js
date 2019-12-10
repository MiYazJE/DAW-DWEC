
const insertarFalla = (nombreFalla, srcFoto) => {
    contenedorFallas.innerHTML += `
        <div class="falla">
            <p class="nombreFalla">${nombreFalla}</p>
            <img class="fotoFalla" src="${srcFoto}" alt="Foto de la falla ${nombreFalla}">
            <button class="btnUbicacion">Ubicación</button>
        </div>`;
}

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

    inputDesde.min = years.minYear;
    inputHasta.max = years.maxYear;

    inputDesde.placeholder = `Dede ${years.minYear}`;
    inputHasta.placeholder = `Hasta ${years.maxYear}`;
}

const insertarComboBoxregiones = (regiones) => {
    
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

    // Mostrar las fallas de la region seleccionada
    comboRegiones.onchange = () => {
        cargarFallas(comboRegiones.options[comboRegiones.selectedIndex].value);
    }

}

const insertarOptions = (regiones) => {
    insertarComboBoxregiones(regiones);
    insertarComboBoxFundacion();
}

const cargarFallas = (sector) => {

    let fallasFiltradas = fallas.filter(falla => falla.sector === sector);

    // Ordenar por orden alfabeticamente las fallas
    fallasFiltradas.sort((falla1, falla2) => falla1.nombre.localeCompare(falla2.nombre));

    // Limpiamos las anteriores busquedas
    contenedorFallas.innerHTML = '';

    fallasFiltradas.map(falla => insertarFalla(falla.nombre, falla.boceto));
}

const obtenerFallas = async () => {

    const response = await fetch(URL);
    const json     = await response.json();
    
    // Obtener todas las propiedades del objeto
    fallas = json.features.map(element => element.properties);
    
    const regiones = fallas.map(element => element.sector);

    insertarOptions(regiones);
}

const init = async () => { await obtenerFallas(); console.log(fallas)}

const URL = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
let fallas;
const contenedorFallas = document.querySelector('#contenedorFallas');

window.onload = init;