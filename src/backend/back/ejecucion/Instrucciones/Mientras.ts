import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Mientras extends Instruccion {
    private _condicion: Instruccion;
    private _instrucciones: Array<Instruccion>;

    constructor(condicion: Instruccion, instrucciones: Array<Instruccion>, linea: string) {
        super(linea);
        this._condicion = condicion;
        this._instrucciones = instrucciones;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
}