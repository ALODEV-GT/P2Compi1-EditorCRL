import { NodoAST } from './NodoAST';
export class RecorrerArbol {
    constructor() {

    }

    recorrerArbol(nodo: NodoAST): string {
        let concatenar: string;
        if (nodo.tipo != "") {
            concatenar = "-> " + nodo.valor + " - " + nodo.tipo + "\n";
        } else {
            concatenar = "#-> " + nodo.valor + "\n";
        }

        nodo.hijos.forEach(element => {
            concatenar += this.recorrerArbol(element);
        });
        return concatenar;
    }

}