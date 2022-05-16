import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { InsDetener } from './InsDetener';
export class Detener extends Instruccion {
    constructor(linea: string) {
        super(linea);
    }
    
    ejecutar(e: Entorno) {
        return new InsDetener
    }
}