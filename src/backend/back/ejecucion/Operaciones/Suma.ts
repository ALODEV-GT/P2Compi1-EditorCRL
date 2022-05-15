import { Entorno } from '../Entorno';
import { Error } from '../Errores/Error';
import { Errores } from '../Errores/Errores';
import { Instruccion } from '../Instruccion';
import { Boolean } from '../Valores/Boolean';
import { Decimal } from '../Valores/Decimal';
import { Entero } from '../Valores/Entero';
export class Suma extends Instruccion {
    private _expIzq: Instruccion;
    private _expDer: Instruccion;

    constructor(expIzq: Instruccion, expDer: Instruccion, linea: string) {
        super(linea);
        this._expIzq = expIzq;
        this._expDer = expDer;
    }

    ejecutar(e: Entorno) {
        const exp1 = this._expIzq.ejecutar(e);
        const exp2 = this._expDer.ejecutar(e);

        if (exp1 == null || exp2 == null) {
            Errores.getInstance().push(new Error("Semantico", this._linea, "No se puede realizar una suma con null"));
            return;
        }

        //boolean + boolean
        if (exp1 instanceof Boolean && exp2 instanceof Boolean) {
            let valor1: number = (exp1.valor_1 == true) ? 1 : 0;
            let valor2: number = (exp2.valor_1 == true) ? 1 : 0;
            let suma = valor1 + valor2;
            return new Decimal(suma, this._linea);
        }

        //Int + Int
        if (exp1 instanceof Entero && exp2 instanceof Entero) {
            console.log("Si entre a sumar los enteros");
            
            let valor1: number = exp1.valor_1;
            let valor2: number = exp2.valor_1;
            let suma = valor1 + valor2;
            console.log("La suma es: " + suma);
            
            return new Entero(suma, this._linea);
        }

        return;
    }

}