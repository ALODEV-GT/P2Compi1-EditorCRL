import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Retorno extends Instruccion {
    private _valor: Instruccion | null;

    constructor(valor: Instruccion | null, linea: string) {
        super(linea);
        this._valor = valor;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
}