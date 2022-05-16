import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
export class Id extends Instruccion {
    private _id: string;

    constructor(id: string, linea: string) {
        super(linea)
        this._id = id;
    }

    ejecutar(e: Entorno) {
        const variable = e.getVariable(this._id);
        if (variable) {
            return variable.valor;
        }

        Errores.getInstance().push(new Error('semantico', this._linea, `No se encontra ningua variable con el id: ${this._id}`));
        return null;
    }

    public get id(): string {
        return this._id;
    }

}