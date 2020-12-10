'use strict'
var express = require('express');
var empleadoController = require('../controllers/empleado');
var mdAuth = require('../middleware/authenticated');
var api = express.Router();

const Socket = require('../models/server');
var server = Socket.getInstance();//puedo saber los clientes que estan conectados

var usuarioLista = require('../sockets/socket');


api.get('/mensaje', (req, response) => {
    response.status(200).send('entrando en mensaje');
});

api.post('/mensaje', (req, response) => {
    var params = req.body;

    var data = {
        cuerpo: params.cuerpo,
        de: params.de
    }

    server.io.emit('mensaje-nuevo', data);

    response.status(200).send(params);
});

//conetar el servicio rest con socket
//enviar un mensaje privado a un solo usuario
api.post('/mensaje/:id', (req, response) => {
    var id = req.params.id;
    var params = req.body;

    server.io.in(id).emit('mensaje-privado', params);

    response.status(200).send(params);

});


/**Obtener todos los id */
api.get('/usuarios', (req, response) => {

    server.io.clients((err, clientes) => {
        if (err) {
            response.status(404).send("Error en el servidor");
        }

        response.status(200).send(clientes);

    });


});


api.get('/usuarios/detalle', (req, response) => {

    var UsuariosConectados = usuarioLista.UsuariosConectados;

    response.status(200).send(UsuariosConectados);



});

module.exports = api;