import { Instruccion } from "../Instruccion"
import { TiposNativos } from './TiposNativo';
import { Variable } from "./Variable";

export class Funcion {
    private _id: string;
    private _instrucciones: Array<Instruccion>;
    private _tipoReturn: TiposNativos;
    private _parametros: Array<Variable>

    constructor(id: string, instrucciones: Array<Instruccion>, tipoReturn: TiposNativos, parametros: Array<Variable>) {
        this._id = id;
        this._instrucciones = instrucciones;
        this._tipoReturn = tipoReturn;
        this._parametros = parametros;
    }

    tieneReturn(): boolean {
        return this._tipoReturn != TiposNativos.VOID;
    }

    tieneParametros(): boolean {
        return this._parametros != null;
    }

    numParametros(): number {
        return this.tieneParametros() ? this._parametros.length : 0;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get instrucciones(): Array<Instruccion> {
        return this._instrucciones;
    }
    public set instrucciones(value: Array<Instruccion>) {
        this._instrucciones = value;
    }
}