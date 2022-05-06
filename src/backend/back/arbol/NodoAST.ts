export class NodoAST {
    private _valor: string;
    private _tipo: string;
    private _hijos: NodoAST[] = [];

    public get hijos(): NodoAST[] {
        return this._hijos;
    }

    public get tipo(): string {
        return this._tipo;
    }

    public get valor(): string {
        return this._valor;
    }

    constructor(valor: string, tipo: string) {
        this._valor = valor;
        this._tipo = tipo;
    }

    agregarHijo(hijo: NodoAST) {
        this._hijos.push(hijo);
    }

}
