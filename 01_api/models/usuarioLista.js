'use strict'


class UsuarioLista {

    lista = [];

    constructor() {
    }

    agregar(usuario) {
        this.lista.push(usuario);
        return usuario;
    }


    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }

        }
        console.log('--Usuario actualizado--:' + id);


    }

    getLista() {

        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);

    }


    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);

    }


    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }

}

module.exports = UsuarioLista;
