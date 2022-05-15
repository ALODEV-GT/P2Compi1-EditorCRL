import { Instruccion } from '../Instruccion';
export class Si {
    private _condicion: Instruccion;
    private _instrucciones: Array<Instruccion>;

    constructor(condicion: Instruccion, instrucciones: Array<Instruccion>) {
        this._condicion = condicion;
        this._instrucciones = instrucciones;
    }

    public get condicion(): Instruccion {
        return this._condicion;
    }

    public get instrucciones(): Array<Instruccion> {
        return this._instrucciones;
    }
}