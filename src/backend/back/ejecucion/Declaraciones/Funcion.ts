import { Instruccion } from "../Instruccion"
import { TiposNativos } from './TiposNativo';
import { Variable } from "./Variable";
import { NodoAST } from '../../arbol/NodoAST';

export class Funcion {
    private _id: string;
    private _instrucciones: Array<Instruccion>;
    private _tipoReturn: TiposNativos;
    private _parametros: Array<Variable>;
    private _nodo: NodoAST;

    constructor(id: string, instrucciones: Array<Instruccion>, tipoReturn: TiposNativos, parametros: Array<Variable>, nodo: NodoAST) {
        this._id = id;
        this._instrucciones = instrucciones;
        this._tipoReturn = tipoReturn;
        this._parametros = parametros;
        this._nodo = nodo;
    }

    tieneReturn(): boolean {
        return this._tipoReturn != TiposNativos.VOID;
    }

    tieneParametros(): boolean {
        return this.parametros == null? false : (this.parametros.length ==0) ? false: true; 
    }

    numParametros(): number {
        return this.tieneParametros() ? this._parametros.length : 0;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get instrucciones(): Array<Instruccion> {
        return this._instrucciones;
    }
    public set instrucciones(value: Array<Instruccion>) {
        this._instrucciones = value;
    }
    public get parametros(): Array<Variable> {
        return this._parametros;
    }
    public set parametros(value: Array<Variable>) {
        this._parametros = value;
    }
    public get tipoReturn(): TiposNativos {
        return this._tipoReturn;
    }

    public get nodo(): NodoAST {
        return this._nodo;
    }
}