import { Entorno } from "../Entorno";
import { Instruccion } from "../Instruccion";
import { Si } from "./Si";

export class InstruccionSi extends Instruccion {
    private _sis: Array<Si>;

    constructor(sis: Array<Si>, linea: string) {
        super(linea);
        this._sis = sis;
    }

    ejecutar(e: Entorno) {
        throw new Error("Method not implemented.");
    }
}