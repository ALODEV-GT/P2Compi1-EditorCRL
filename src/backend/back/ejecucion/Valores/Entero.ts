import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Entero extends Instruccion {

    private _valor: number;

    constructor(valor: number, linea: string) {
        super(linea);
        this._valor = valor;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
    public get valor_1(): number {
        return this._valor;
    }

}