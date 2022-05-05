export class ContadorVentanas {
    public get contador(): number {
        return this._contador;
    }

    public incrementar(){
        this._contador++;
    }

    constructor(
        private _contador: number = 1
    ) { }
    
}