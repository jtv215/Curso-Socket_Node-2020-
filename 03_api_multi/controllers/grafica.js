'user strict'
const Grafica = require('../models/grafica');
const Socket = require('../models/server');
var server = Socket.getInstance();//puedo saber los clientes que estan conectados

var grafica = new Grafica();

function getGrafica(req, res) {
    var data=grafica.getdata();
    res.status(200).send(data);
}

function addGrafica(req, res) {
    var params = req.body;
    var mes= params.mes;
    var unidades= Number(params.unidades);

    
    grafica.incrementarValor(mes,unidades);
    var data= grafica.getdata();

    server.io.emit('cambio-grafica', data);

    res.status(200).send(data);
    
}



module.exports = {  
    getGrafica,
    addGrafica
   
};