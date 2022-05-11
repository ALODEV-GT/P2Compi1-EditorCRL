export class NodoAST {
    private _valor: string;
    private _tipo: string;
    private _hijos: NodoAST[] = [];
    private _linea: string;
    public get linea(): string {
        return this._linea;
    }
    public set linea(value: string) {
        this._linea = value;
    }

    public get hijos(): NodoAST[] {
        return this._hijos;
    }

    public get tipo(): string {
        return this._tipo;
    }

    public get valor(): string {
        return this._valor;
    }

    constructor(valor: string, tipo: string, linea: string) {
        this._valor = valor;
        this._tipo = tipo;
        this._linea = linea;
    }

    agregarHijo(hijo: NodoAST) {
        this._hijos.push(hijo);
    }

}
