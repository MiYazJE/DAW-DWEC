import HTTPMethods from "./httpMethods.js";

export default class StarRating {

    getHTML(idFalla) {
        return `
            <div idFalla="${idFalla}" class="star-rating">
                <span class="star" value="5" href="#">&#9733;</span>
                <span class="star" value="4" href="#">&#9733;</span>
                <span class="star" value="3" href="#">&#9733;</span>
                <span class="star" value="2" href="#">&#9733;</span>
                <span class="star" value="1" href="#">&#9733;</span>
            </div>
        `;
    }

    /**
     * Rellenar con su respectiva puntuación a cada una de las fallas ya votadas
     */
    async rellenarPuntuacionesFallas() {

        const puntuaciones = await this.getAllData();
        if (puntuaciones.length == 0) return;
    
        const starsParents = document.querySelectorAll('.star-rating');

        // Mejorar el rendimiento gracias a los métodos has y get de la clase Map
        let mapParentStars = new Map();
        starsParents.forEach(parentStar => {
            mapParentStars.set(parentStar.getAttribute('idFalla'), parentStar);
        })

        puntuaciones.forEach(puntuacion => {
            if (mapParentStars.has(puntuacion.idFalla)) {
                let stars = mapParentStars.get(puntuacion.idFalla).children;
                this.paintStars(puntuacion.puntuacion, stars);
            }
        })

    }

    getAllData = () => new HTTPMethods().getPuntuaciones();

    applyEvents() {
        
        const stars = document.querySelectorAll('.star');

        stars.forEach(star => star.onclick = () => {

            // Get id from parent
            let idFalla = star.parentElement.getAttribute('idFalla');
            
            // Get value of puntuation
            let value = star.getAttribute('value');

            this.paintStars(value, star.parentElement.children);

            this.sendPuntuation(idFalla, value);
        })

    }

    /**
     * Colorea todas las estrellas a su izquierda del color $selected cuando se
     * hace click sobre una de ellas, las que estan a su derecha del color $normal 
     * @param {indice span click} indice 
     * @param {contenedor de todas las estrellas(span)} parentStars 
     */
    paintStars(indice, parentStars) {

        let pintar = true;
        let selected = '#F39C12';
        let normal   = '#95A5A6';

        for (let i = 4; i >= 0; i--) {
            if (pintar) {
                parentStars[i].style.color = selected;
            }
            else {
                parentStars[i].style.color = normal;
            }
            if (parentStars[i].getAttribute('value') == indice) {
                pintar = false;
            }
        }
        
    }

    async sendPuntuation(idFalla, points) {
        
        const httpMethods = new HTTPMethods(); 

        let puntuacion = {
            idFalla: idFalla,
            puntuacion: points,
            ip: await httpMethods.getIp()
        }

        httpMethods.sendPuntuacion(puntuacion);
    }

}