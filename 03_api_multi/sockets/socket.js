var UsuarioLista = require('../models/usuarioLista');
var Usuario = require('../models/usuario');

var usuarioConectados = new UsuarioLista();

module.exports = {
    start: function (io) {
        io.on('connection', function (cliente) {
            console.log("Se ha conectado el id: " + cliente.id);          

            var usuario = new Usuario(cliente.id);
            usuarioConectados.agregar(usuario);


            cliente.on('disconnect', function () {
                var usuario = new Usuario();
                console.log("cliente se ha desconectado con el el id" + cliente.id);

                usuarioConectados.borrarUsuario(cliente.id);

                io.emit('usuarios-activos', usuarioConectados.getLista());
            });
            
            cliente.on('obtenerUsuarios', (data) => {
                io.emit('usuarios-activos', usuarioConectados.getLista());
            });

            cliente.on('mensaje', (data) => {
                io.emit('mensaje-nuevo', data);

            });
            

            //escuchar y enviar (como si fuera post)
            cliente.on('configurar-usuario', (data, callback) => {
                if (!data) {
                    return callback({
                        error: true,
                        mensaje: 'No se ha recibido ningún dato'
                    });
                } else {
                    usuarioConectados.actualizarNombre(cliente.id, data.nombre)
                    var usu = usuarioConectados.getUsuario(cliente.id);

                    io.emit('usuarios-activos', usuarioConectados.getLista());

                    callback(usu)
                }
            });



        });
    },
    UsuariosConectados: usuarioConectados
}


