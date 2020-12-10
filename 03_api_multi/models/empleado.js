'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema= Schema({
    nombre: String,
    apellidos: String,
    email: {
        type:String,
        lowercase: true       
    },
    password: String,
    telefono1 : String,
    telefono2: String,
    estado: String,
    fechaCreacion : Date,
    role: String
})

module.exports = mongoose.model('Empleado',EmpleadoSchema);