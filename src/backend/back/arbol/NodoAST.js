export const NodoAST = class NodoAST {
    constructor(valor, tipo) {
        this.valor = valor;
        this.tipo = tipo;
        this.hijos = [];
    }

    getValor() {
        this.valor;
    }

    getTipo() {
        this.tipo;
    }

    agregarHijo(hijo) {
        this.hijos.push(hijo);
    }
}