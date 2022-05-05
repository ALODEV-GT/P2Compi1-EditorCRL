export class Proyecto {
    public get idVentana(): number {
        return this._idVentana;
    }
    public set idVentana(value: number) {
        this._idVentana = value;
    }
    public get contenido(): string {
        return this._contenido;
    }
    public set contenido(value: string) {
        this._contenido = value;
    }
    constructor(
        private _contenido: string,
        private _idVentana: number,
    ) { }

}