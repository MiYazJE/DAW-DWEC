const Puntuacion = require('../models/puntuacion.model.js');

// Get all data of puntuaciones
exports.findAll = (req,res) => {

    Puntuacion.find()
    .then(puntuaciones => {
        res.send(puntuaciones);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });

};


// create and save
exports.create = (req,res) => {

    // validate puntuacion
    if (!req.body){
        console.log(req.body);
        return res.status(400).send({
           message: "puntuacion Vacia..." 
        });
    }

    // Create the object
    const puntuacion = new Puntuacion({
        idFalla: req.body.idFalla || "idFallaVacio",
        ip: req.body.ip || "127.0.0.1",
        puntuacion: req.body.puntuacion || 42
    })

    // Save the object
    puntuacion.save()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something was wrong creating puntuacion"
            });
    });
};