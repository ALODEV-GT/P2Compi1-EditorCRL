export class Consola {
    private _lista: any[];

    public get lista(): any[] {
        return this._lista;
    }
    public set lista(value: any[]) {
        this._lista = value;
    }

    constructor() {
        this._lista = [];
    }


}