export class InsRetorno {
    private _tieneValor: boolean;
    private _valor: any;

    constructor(tieneValor: boolean, valor: any = null) {
        this._tieneValor = tieneValor;
        this._valor = valor;
    }

    tieneValor(): boolean {
        return this._tieneValor;
    }

    public get valor(): any {
        return this._valor;
    }
}