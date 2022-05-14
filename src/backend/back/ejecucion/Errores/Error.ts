export class Error {
    private _tipo: string;
    private _linea: string;
    private _descripcion: string;

    constructor(tipo: string, linea: string, descripcion: string) {
        this._tipo = tipo;
        this._linea = linea;
        this._descripcion = descripcion;
    }
}