import { Nodo } from './Nodo';
import { NodoAST } from '../arbol/NodoAST';
export class Lista {
    private _raiz: Nodo | null = null;
    private _ultimo: Nodo | null = null;
    constructor() { }

    agregarNodo(valor: NodoAST, numTabs: number): void {
        if (this._raiz == null) {
            this._raiz = new Nodo(valor, numTabs);
            this._ultimo = this._raiz;
        } else {
            this._ultimo!.anterior = new Nodo(valor, numTabs);
            this._ultimo = this._ultimo!.anterior;
        }
    }

    mostrarNodos(inicio: Nodo): void {
        let nodo: Nodo | null = inicio;
        while (nodo != null) {
            console.log(nodo.numTabs + "-" + nodo.valor.valor);
            nodo = nodo.anterior;
        }
    }

    public get raiz(): Nodo | null {
        return this._raiz;
    }

    public limpiar(){
        this._raiz = null;
    }
}