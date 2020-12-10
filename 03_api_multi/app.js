'use strict'

var bodyParser = require('body-parser');

const Socket = require('./models/server');
var server = Socket.getInstance();

//cargar rutas
var empleado_routes = require('./routes/empleado');
var mensaje_routes = require('./routes/mensaje');
var grafica_routes = require('./routes/grafica');



server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json()); //el texto lo convierte en json

// configurar cabeceras http
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//ruta base "intermediaria para poner /api"
server.app.use('/api', empleado_routes);
server.app.use('/api', mensaje_routes);
server.app.use('/api', grafica_routes);


module.exports = server.app;
