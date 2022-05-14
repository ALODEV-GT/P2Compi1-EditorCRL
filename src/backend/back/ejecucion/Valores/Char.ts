import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Char extends Instruccion {

    private _valor: string;

    constructor(valor: string, linea: string) {
        super(linea);
        this._valor = this.formatear(valor);
    }

    private formatear(valor: string): string {
        if (valor.startsWith("\"") || valor.startsWith("'") || valor.startsWith("`")) {
            return valor.substr(1, valor.length - 2);
        }
        return valor;
    }

    ejecutar(e: Entorno) {
        return this;
    }

    public get valor(): string {
        //Si es un numero devolver su caracter equivalente
        return this._valor;
    }

}