import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Salida } from '../Salida';
import { Decimal } from '../Valores/Decimal';
import { Entero } from '../Valores/Entero';
import { Cadena } from '../Valores/Cadena';
import { Boolean } from '../Valores/Boolean';
import { Char } from '../Valores/Char';
export class Mostrar extends Instruccion {
    private _expresiones: Instruccion[];

    constructor(expresiones: Instruccion[], linea: string) {
        super(linea);
        this._expresiones = expresiones;
    }

    ejecutar(e: Entorno) {
        this._expresiones.forEach(inst => {
            let res = inst.ejecutar(e);
            let salida = 'null';
            if (res instanceof Entero || res instanceof Decimal) {
                salida = res.valor_1.toString();
            }
            if (res instanceof Cadena) {
                salida = res.valor;
            }

            if (res instanceof Boolean) {
                salida = res.valorString();
            }

            if(res instanceof Char){
                salida = res.valor;
            }

            Salida.getInstance().push(salida)
        });
    }
}