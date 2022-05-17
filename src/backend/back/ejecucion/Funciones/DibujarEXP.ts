import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { NodoAST } from '../../arbol/NodoAST';
import { ContenidoImagenes } from '../ContenidoImagenes';
export class DibujarEXP extends Instruccion {
    private _nodo: NodoAST; //Es el nodo raiz de la expresion

    constructor(nodo: NodoAST, linea: string) {
        super(linea);
        this._nodo = nodo;
    }

    ejecutar(e: Entorno) {
        ContenidoImagenes.getInstance().pushImgExp(this._nodo);
        return
    }
}