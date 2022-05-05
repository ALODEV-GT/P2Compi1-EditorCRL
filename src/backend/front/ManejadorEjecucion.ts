export class ManejadorEjecucion {
    public get ventanaActiva(): number {
        return this._ventanaActiva;
    }
    public set ventanaActiva(value: number) {
        this._ventanaActiva = value;
    }
    constructor(
        private _ventanaActiva: number = 1
    ) { }

    
}