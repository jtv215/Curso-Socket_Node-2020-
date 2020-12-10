'use strict'
var express = require('express');
var api = express.Router();
var graficaController = require('../controllers/grafica');
var mdAuth = require('../middleware/authenticated');




api.get('/grafica', graficaController.getGrafica);
api.post('/grafica', graficaController.addGrafica);



module.exports = api;