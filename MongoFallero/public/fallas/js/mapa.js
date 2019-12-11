
export default class Mapa {

    constructor(idMapa) {
        this.idMapa = idMapa;
    }

    crearMapa() {

        this.map = L.map(this.idMapa).setView([0, 0], 1);

        let tilerMapUrl = 'https://api.maptiler.com/maps/topo/256/{z}/{x}/{y}.png?key=FeZF25xvZUuP463NS59g';
        L.tileLayer(tilerMapUrl, {
            attribution: 'Map data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Imagery © <a href="http://www.kartena.se/">Kartena</a>'
        }).addTo(this.map);

    }

    modificarCoordenadas(coordenadas) {

        // Cambiar la proyeccion de la referencia espacial 25830 a 4326
        let firstProjection  = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';
        let secondProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
        coordenadas = proj4(firstProjection, secondProjection, coordenadas);

        coordenadas = [coordenadas[1], coordenadas[0]];

        this.map.setView(coordenadas, 16);

        // Eliminar el marcador de la busqueda anterior
        if (this.marker) 
            this.map.removeLayer(this.marker);
        
        this.marker = L.marker(coordenadas).addTo(this.map);
    }

}