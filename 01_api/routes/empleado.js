'use strict'
var express = require('express');
var empleadoController = require('../controllers/empleado');
var mdAuth = require('../middleware/authenticated');
var api = express.Router();

api.post('/login_empleado', empleadoController.loginEmpleado);
api.post('/empleado',mdAuth.ensureAuth, empleadoController.saveEmpleado);
api.put('/empleado/:id', mdAuth.ensureAuth, empleadoController.updateEmpleado);
api.get('/empleado/:id',mdAuth.ensureAuth, empleadoController.getEmpleado);
api.get('/empleado',mdAuth.ensureAuth, empleadoController.getEmpleados);
api.delete('/empleado/:id', mdAuth.ensureAuth, empleadoController.deleteEmpleado);
api.put('empleado_cambiar_estado/:id', mdAuth.ensureAuth, empleadoController.cambiarEstado);
api.post('/email', empleadoController.sendEmail);
api.put('/cambiar_clave/:id',mdAuth.ensureAuth, empleadoController.changePassword);


module.exports = api;