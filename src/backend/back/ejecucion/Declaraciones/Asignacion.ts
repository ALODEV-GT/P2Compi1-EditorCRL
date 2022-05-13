import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Asignacion extends Instruccion {
    private _id: string
    private _exp: Instruccion

    constructor(id: string, exp: Instruccion, linea: string) {
        super(linea);
        this._id = id;
        this._exp = exp;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
}