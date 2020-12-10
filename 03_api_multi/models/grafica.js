'use strict'

class Grafica {

    meses = ['enero', 'febrero', 'marzo', 'abril'];
    valores = [0, 0, 0, 0];
    constructor() {
    }

    getdata() {
        return this.valores;
    }

    incrementarValor(mes, valor) {

        mes = mes.toLowerCase().trim();

        for (let i in this.meses) {
            if (this.meses[i] === mes) {
                this.valores[i] += valor

            }
        }
        return this.getdata();
    }

}

module.exports = Grafica;