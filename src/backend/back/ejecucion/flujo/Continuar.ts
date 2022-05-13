import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
export class Continuar extends Instruccion {
    constructor(linea: string) {
        super(linea);
    }
    
    ejecutar(e: Entorno) {
        throw new Error('Method not implemented.');
    }
}