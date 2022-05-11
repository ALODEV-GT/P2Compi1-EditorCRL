import * as _ from 'lodash';
import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Salida } from './Salida';
export class Log extends Instruccion {

    instrucciones: Instruccion[];

    constructor(linea: string, instrucciones: Instruccion[]) {
        super(linea);
        this.instrucciones = instrucciones;
    }

    ejecutar(e: Entorno) {
        this.instrucciones.forEach(inst => {
            let res = inst.ejecutar(e);
            res = _.cloneDeep(res);
            const salida = res ?? 'null';
            Salida.getInstance().push(salida);
        });
    }

}