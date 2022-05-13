import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class For extends Instruccion {
    private _condicion: Instruccion;
    private _incremento: boolean;
    private _instrucciones: Array<Instruccion>;
    private _variable: Instruccion | null;

    constructor(condicion: Instruccion, incremento: boolean, instrucciones: Array<Instruccion>, variable: Instruccion | null, linea: string) {
        super(linea);
        this._condicion = condicion;
        this._incremento = incremento;
        this._instrucciones = instrucciones;
        this._variable = variable;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
}