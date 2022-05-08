import { Nodo } from './Nodo';
import { NodoAST } from '../arbol/NodoAST';
export class Agrupador {
    constructor() { }

    ordenar(raiz: Nodo | null) {
        let nodo: Nodo | null = raiz;
        let seguir: boolean = true;
        let numTabsAnterior: number;
        while (nodo != null) {
            let tipo: string = nodo.valor.hijos[0].valor;
            if (tipo == "MIENTRAS" || tipo == "INSTRUCCION_SI" || tipo == "INSTRUCCION_SINO"
                || tipo == "DECLARACION_FUN" || tipo == "PARA") {
                let anterior: Nodo | null = nodo.anterior;
                if (anterior != null) {
                    numTabsAnterior = anterior.numTabs;
                    if (numTabsAnterior > nodo.numTabs) {
                        while (anterior != null && seguir) {
                            if (anterior.numTabs == numTabsAnterior) {
                                anterior.hijo = true;
                                nodo.valor.agregarHijo(anterior.valor);
                            } else if (anterior.numTabs < numTabsAnterior) {
                                seguir = false;
                            }
                            anterior = anterior.anterior;
                        }
                        seguir = true;
                    }
                }
            }
            nodo = nodo.anterior;
        }
        //this.mostrar(raiz);
    }

    agruparArbol(nodo: Nodo | null): NodoAST {
        let inicio: NodoAST = new NodoAST("INICIO", "");
        while (nodo != null) {
            if(!nodo.hijo){
                inicio.agregarHijo(nodo.valor);
            }
            nodo = nodo.anterior;
        }
        return inicio;
    }

    mostrar(raiz: Nodo | null) {
        let nodoN: Nodo | null = raiz;
        console.log("-----------AGRUPACION-----------");
        while (nodoN != null) {
            let nodo: NodoAST = nodoN.valor;
            console.log("Padre: " + nodo.valor);
            for (let i = 0; i < nodo.hijos.length; i++) {
                console.log("Hijo: " + nodo.hijos[i].valor);
            }
            nodoN = nodoN?.anterior;
        }
    }
}