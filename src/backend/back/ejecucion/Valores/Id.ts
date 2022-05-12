import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Id extends Instruccion {
    private _id: string;

    constructor(id: string, linea: string) {
        super(linea)
        this._id = id;
    }

    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }

    public get id(): string {
        return this._id;
    }

}