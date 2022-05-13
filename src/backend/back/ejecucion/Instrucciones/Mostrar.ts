import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Mostrar extends Instruccion {
    private _expresiones: Instruccion[];

    constructor(expresiones: Instruccion[], linea: string) {
        super(linea);
        this._expresiones = expresiones;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
}