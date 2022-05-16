import { TiposNativos } from "./TiposNativo";
import { Instruccion } from '../Instruccion';

export class Variable {
    private _id: string;
    private _tipo: TiposNativos;
   
    valor: Instruccion | null = null;

    constructor(id: string, tipo: TiposNativos, valor?: Instruccion | null) {
        this._id = id;
        this._tipo = tipo;
        this.valor = valor!;
    }  

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get tipo(): TiposNativos {
        return this._tipo;
    }
    public set tipo(value: TiposNativos) {
        this._tipo = value;
    }

}