import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { InsContinuar } from './InsContinuar';
export class Continuar extends Instruccion {
    constructor(linea: string) {
        super(linea);
    }

    ejecutar(e: Entorno) {
        return new InsContinuar();
    }
}