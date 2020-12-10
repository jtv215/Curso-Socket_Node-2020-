'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Socket = require('./models/server');
var server = Socket.getInstance();//inicializa el socket
var rutas = require('./app');//carga rutas




mongoose.connect('mongodb://localhost:27017/bd_crm', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La conexión de la base de datos bd_crm se está ejecutándose correctamente");

        server.start();

    }
})


