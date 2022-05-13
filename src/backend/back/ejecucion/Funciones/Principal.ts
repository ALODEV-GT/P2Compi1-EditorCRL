import { TiposNativos } from '../Declaraciones/TiposNativo';
import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Principal extends Instruccion {
    private _tipo: TiposNativos
    private _id: string;
    private _instrucciones: Array<Instruccion>;

    constructor(tipo: TiposNativos, id: string, instrucciones: Array<Instruccion>, linea: string) {
        super(linea);
        this._tipo = tipo;
        this._id = id;
        this._instrucciones = instrucciones
    }

    ejecutar(e: Entorno) {
        throw new Error("Method not implemented.");
    }
}