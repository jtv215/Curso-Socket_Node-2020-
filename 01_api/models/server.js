var express = require('express');

class Server {
    static _instance = new Server();
    app;
    port;
    io;
    server;

    constructor() {
            this.app =  express();            
            this.port = process.env.PORT || 3977;
            this.server = require('http').Server(this.app);
            this.io = require('socket.io')(this.server);
            this.escucharSockets(this.io);     
            this._instance = this;      
    }

    static getInstance() {
        return this._instance || (this._instance = new this());
    }

    escucharSockets(io){
        var controller = require('../sockets/socket.js');
        controller.start(io);
    }

    start() {
        this.server.listen(this.port);
        console.log("Servidor de la API REST se está escuchando en http://localhost:" + this.port)
    }

}


module.exports = Server;