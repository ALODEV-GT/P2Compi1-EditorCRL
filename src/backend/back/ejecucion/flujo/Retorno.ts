import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { InsRetorno } from './InsRetorno';
export class Retorno extends Instruccion {
    private _valor: Instruccion | null;

    constructor(valor: Instruccion | null, linea: string) {
        super(linea);
        this._valor = valor;
    }

    ejecutar(e: Entorno) {
        if (this.tieneValor()) {
            const valor = this._valor?.ejecutar(e);
            return new InsRetorno(this.tieneValor(), valor);
        } else {
            return new InsRetorno(this.tieneValor());
        }
    }

    tieneValor(): boolean {
        return this._valor != null ? true : false;
    }
}