import { TiposNativos } from '../Declaraciones/TiposNativo';
import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Parametro extends Instruccion {

    private _tipo: TiposNativos;
    private _id: string;

    constructor(tipo: TiposNativos, id: string, linea: string) {
        super(linea);
        this._tipo = tipo;
        this._id = id;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }

    public get id(): string {
        return this._id;
    }
}