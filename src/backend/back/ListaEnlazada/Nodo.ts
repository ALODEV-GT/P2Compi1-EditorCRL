import { NodoAST } from '../arbol/NodoAST';
export class Nodo {
    private _anterior: Nodo | null = null;
    private _valor: NodoAST;
    private _numTabs: number;
    private _siguiente: Nodo | null = null;
    private _hijo: boolean = false;

    constructor(valor: NodoAST, numTabs: number) {
        this._valor = valor;
        this._numTabs = numTabs;
    }
    public get hijo(): boolean {
        return this._hijo;
    }
    public set hijo(value: boolean) {
        this._hijo = value;
    }
    public get anterior(): Nodo | null {
        return this._anterior;
    }
    public set anterior(value: Nodo | null) {
        this._anterior = value;
    }
    public get siguiente(): Nodo | null {
        return this._siguiente;
    }
    public set siguiente(value: Nodo | null) {
        this._siguiente = value;
    }
    public get valor(): NodoAST {
        return this._valor;
    }
    public set valor(value: NodoAST) {
        this._valor = value;
    }
    public get numTabs(): number {
        return this._numTabs;
    }
}