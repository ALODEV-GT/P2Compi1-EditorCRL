import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { TiposNativos } from './TiposNativo';
export class DeclaracionVar extends Instruccion {
    private _tipo: TiposNativos;
    private _ids: string[];
    private _exp: Instruccion | null;

    constructor(tipo: TiposNativos, ids: string[], exp: Instruccion | null, linea: string) {
        super(linea);
        this._tipo = tipo;
        this._ids = ids;
        this._exp = exp;
    }
    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
}