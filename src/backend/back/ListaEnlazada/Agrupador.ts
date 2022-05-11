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
                || tipo == "DECLARACION_FUN" || tipo == "PARA" || tipo == "FUNCION_PRINCIPAL") {
                let anterior: Nodo | null = nodo.anterior;
                if (anterior != null) {
                    numTabsAnterior = anterior.numTabs;
                    if (numTabsAnterior > nodo.numTabs) {
                        while (anterior != null && seguir) {
                            if (anterior.numTabs == numTabsAnterior) {
                                anterior.hijo = true;
                                if(nodo.valor.hijos[0].hijos[nodo.valor.hijos[0].hijos.length-1].valor == "INSTRUCCIONES"){
                                    nodo.valor.hijos[0].hijos[nodo.valor.hijos[0].hijos.length-1].agregarHijo(anterior.valor);
                                }else{
                                    nodo.valor.hijos[0].agregarHijo(new NodoAST("INSTRUCCIONES","","0"));
                                    nodo.valor.hijos[0].hijos[nodo.valor.hijos[0].hijos.length-1].agregarHijo(anterior.valor);
                                }
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
    }

    agruparArbol(nodo: Nodo | null, linea: string): NodoAST {
        let instrucciones: NodoAST = new NodoAST("INSTRUCCIONES", "", linea);
        while (nodo != null) {
            if (!nodo.hijo) {
                instrucciones.agregarHijo(nodo.valor);
            }
            nodo = nodo.anterior;
        }
        let inicio: NodoAST = new NodoAST("INICIO", "", linea);
        inicio.agregarHijo(instrucciones);
        return inicio;
    }

}