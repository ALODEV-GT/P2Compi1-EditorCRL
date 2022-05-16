import { Instruccion } from "../Instruccion";
import { TiposNativos } from '../Declaraciones/TiposNativo';
import { Parametro } from "./Parametro";
import { Entorno } from "../Entorno";
import { NodoAST } from '../../arbol/NodoAST';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
import { Funcion } from "../Declaraciones/Funcion";
import { Variable } from '../Declaraciones/Variable';

export class DeclaracionFuncion extends Instruccion {

    private _tipo: TiposNativos
    private _id: string;
    private _parametros: Array<Variable>;
    private _instrucciones: Array<Instruccion>;
    private _nodo: NodoAST;

    constructor(tipo: TiposNativos, id: string, parametros: Array<Variable>, instrucciones: Array<Instruccion>, nodo: NodoAST, linea: string) {
        super(linea);
        this._tipo = tipo;
        this._id = id;
        this._parametros = parametros;
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
        //Validacion nombre de parametros unicos
        if (this._parametros) {
            const items: any[] = [];
            for (let variable of this._parametros) {
                if (items.includes(variable.id)) {
                    Errores.getInstance().push(new Error("Semantico", this._linea, `La funcion ${this._id} ya tiene un parametro declarado con el nombre ${variable.id}`));
                    return;
                }
                items.push(variable.id);
            }
        }

        e.setFuncion(new Funcion(this._id, this._instrucciones, this._tipo, this._parametros));
        console.log("Funcion declarada");
    }

}