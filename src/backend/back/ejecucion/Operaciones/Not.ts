import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Not extends Instruccion {
    private _exp: Instruccion;

    constructor(exp: Instruccion, linea: string) {
        super(linea);
        this._exp = exp;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }

}