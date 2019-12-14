
export default class HTTPMethods {

    constructor() {
        this.url = 'http://localhost:3030/puntuaciones/'
    }
    
    async sendPuntuacion(puntuacion) {

        this.init = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(puntuacion)
        }

        this.request = new Request(this.url, this.init)

        let data = await fetch(this.request) 
        let json = await data.json()
        return json;
    }

    async getAllPuntuaciones() {
        let data = await fetch(this.url)
        let json = await data.json()
        return json;
    }

}