import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { ContenidoImagenes } from '../ContenidoImagenes';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
import { Funcion } from '../Declaraciones/Funcion';
export class DibujarAST extends Instruccion {

    private _id: string;

    constructor(id: string, linea: string) {
        super(linea);
        this._id = id;
    }

    ejecutar(e: Entorno) {

        const funcion: Funcion | null = e.getFuncion(this._id)

        //Si no existe la funcion
        if (!funcion) {
            Errores.getInstance().push(new Error('semantico', this._linea, `La funcion ${this._id} no esta declarada`));
            return;
        }
        ContenidoImagenes.getInstance().pushFunAST(funcion.nodo);
        return
    }

}