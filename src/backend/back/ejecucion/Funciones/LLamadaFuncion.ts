import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class LlamadaFuncion extends Instruccion {
    private _id: string;
    private parametros: Array<Instruccion>;

    constructor(id: string, parametros: Array<Instruccion>, linea: string) {
        super(linea);
        this._id = id;
        this.parametros = parametros;
    }

    ejecutar(e: Entorno) {
        
        
    }
}