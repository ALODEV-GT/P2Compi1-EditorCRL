import { Variable } from "./Variable";
import { Funcion } from './Funcion';

export class Entorno {
    _variables: Map<String, Variable>;
    _padre: Entorno | null
    _funciones: Map<String, Funcion>;

    constructor(padre?: Entorno) {
        this._padre = padre != null ? padre : null;
        this._variables = new Map();
        this._funciones = new Map();
    }
}