import { TiposNativos } from '../Declaraciones/TiposNativo';
import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
import { Funcion } from '../Declaraciones/Funcion';
import { NodoAST } from '../../arbol/NodoAST';
export class Principal extends Instruccion {
    private _tipo: TiposNativos
    private _id: string;
    private _instrucciones: Array<Instruccion>;
    private _nodo: NodoAST;

    constructor(tipo: TiposNativos, id: string, instrucciones: Array<Instruccion>, linea: string, nodo: NodoAST) {
        super(linea);
        this._tipo = tipo;
        this._id = id;
        this._instrucciones = instrucciones
        this._nodo = nodo;
    }

    ejecutar(e: Entorno) {
        const funcion = e.getFuncion(this._id);
        //Validación de funcion con nombre unico en el entorno
        if (funcion) {
            Errores.getInstance().push(new Error("semantico", this._linea, `Ya existe una funcion con el nombre ${this._id}`));
            return;
        }

        e.setFuncion(new Funcion(this._id, this._instrucciones, this._tipo, [], this._nodo));
    }
}