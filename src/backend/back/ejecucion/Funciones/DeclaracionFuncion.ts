import { Instruccion } from "../Instruccion";
import { TiposNativos } from '../Declaraciones/TiposNativo';
import { Parametro } from "./Parametro";
import { Entorno } from "../Entorno";

export class DeclaracionFuncion extends Instruccion {

    private _tipo: TiposNativos
    private _id: string;
    private _parametros: Array<Parametro>;
    private _instrucciones: Array<Instruccion>;

    constructor(tipo: TiposNativos, id: string, parametros: Array<Parametro>, instrucciones: Array<Instruccion>, linea: string) {
        super(linea);
        this._tipo = tipo;
        this._id = id;
        this._parametros = parametros;
        this._instrucciones = instrucciones
    }

    ejecutar(e: Entorno) {
        throw new Error("Method not implemented.");
    }

}