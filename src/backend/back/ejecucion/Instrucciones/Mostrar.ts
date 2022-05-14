import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Salida } from '../Salida';
import { Entero } from '../Valores/Entero';
export class Mostrar extends Instruccion {
    private _expresiones: Instruccion[];

    constructor(expresiones: Instruccion[], linea: string) {
        super(linea);
        this._expresiones = expresiones;
    }

    ejecutar(e: Entorno) {
        this._expresiones.forEach(inst => {
            let res = inst.ejecutar(e);
            console.log("La res es: " + res);
            let salida ='null';
            if(res instanceof Entero){
                salida = res.valor_1.toString();
            }

            Salida.getInstance().push(salida)
        });
    }
}