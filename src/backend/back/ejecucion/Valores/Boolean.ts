import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Boolean extends Instruccion {

    private _valor: boolean;

    constructor(valor: boolean, linea: string) {
        super(linea);
        this._valor = valor;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
    public get valor_1(): boolean {
        return this._valor;
    }

}