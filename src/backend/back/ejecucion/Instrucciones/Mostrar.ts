import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Salida } from '../Salida';
import { Decimal } from '../Valores/Decimal';
import { Entero } from '../Valores/Entero';
import { Cadena } from '../Valores/Cadena';
import { Boolean } from '../Valores/Boolean';
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

            Salida.getInstance().push(salida)
        });
    }
}