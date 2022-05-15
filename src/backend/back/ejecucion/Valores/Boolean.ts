import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Boolean extends Instruccion {

    private _valor: boolean;

    constructor(valor: boolean, linea: string) {
        super(linea);
        this._valor = valor;
    }

    ejecutar(e: Entorno) {
        return this;
    }
    public get valor_1(): boolean {
        return this._valor;
    }

    valorNumerico(): number {
        let valor = (this.valor_1 == true) ? 1 : 0;
        return valor;
    }

    valorString(): string {
        let valor = (this.valor_1 == true) ? "true" : "false";
        return valor;
    }

}