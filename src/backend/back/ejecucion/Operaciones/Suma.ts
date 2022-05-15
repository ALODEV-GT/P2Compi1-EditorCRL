import { Entorno } from '../Entorno';
import { Error } from '../Errores/Error';
import { Errores } from '../Errores/Errores';
import { Instruccion } from '../Instruccion';
import { Boolean } from '../Valores/Boolean';
import { Decimal } from '../Valores/Decimal';
import { Entero } from '../Valores/Entero';
import { Cadena } from '../Valores/Cadena';
import { Char } from '../Valores/Char';
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
            Errores.getInstance().push(new Error("semantico", this._linea, "No se puede realizar una suma con null"));
            return;
        }

        if (exp1 instanceof Boolean) {
            //Boolean + Boolean
            if (exp2 instanceof Boolean) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valorNumerico();
                let suma = valor1 + valor2;
                return new Decimal(suma, this._linea);
            }

            //Boolean + Double
            if (exp2 instanceof Decimal) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Decimal(suma, this._linea);
            }

            //Boolean + String
            if (exp2 instanceof Cadena) {
                let valor1: string = exp1.valorString();
                let valor2: string = exp2.valor;
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }

            //Boolean + Int
            if (exp2 instanceof Entero) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Entero(suma, this._linea);
            }

            //Boolean + Char
            if (exp2 instanceof Char) {
                Errores.getInstance().push(new Error("semantico", this._linea, "No se puede sumar Boolean con un Char"));
            }
        }

        if (exp1 instanceof Decimal) {
            //Double + Boolean
            if (exp2 instanceof Boolean) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valorNumerico();
                let suma = valor1 + valor2;
                return new Decimal(suma, this._linea);
            }

            //Double + Double
            if (exp2 instanceof Decimal) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Decimal(suma, this._linea);
            }

            //Double + String
            if (exp2 instanceof Cadena) {
                let valor1: number = exp1.valor_1;
                let valor2: string = exp2.valor;
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }

            //Double + Int
            if (exp2 instanceof Entero) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Decimal(suma, this._linea);
            }

            //Double + Char
            if (exp2 instanceof Char) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valorNumerico();
                let suma = valor1 + valor2;
                return new Decimal(suma, this._linea);
            }
        }

        if (exp1 instanceof Cadena) {
            //String + Boolean
            if (exp2 instanceof Boolean) {
                let valor1: string = exp1.valor;
                let valor2: string = exp2.valorString();
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }

            //String + Double
            if (exp2 instanceof Decimal) {
                let valor1: string = exp1.valor;
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }

            //String + String
            if (exp2 instanceof Cadena) {
                let valor1: string = exp1.valor;
                let valor2: string = exp2.valor;
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }

            //String + Int
            if (exp2 instanceof Entero) {
                let valor1: string = exp1.valor;
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }

            //String + Char
            if (exp2 instanceof Char) {
                let valor1: string = exp1.valor;
                let valor2: string = exp2.valor;
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }
        }

        if (exp1 instanceof Entero) {
            //Int + Boolean
            if (exp2 instanceof Boolean) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valorNumerico();
                let suma = valor1 + valor2;
                return new Entero(suma, this._linea);
            }

            //Int + Double
            if (exp2 instanceof Decimal) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Decimal(suma, this._linea);
            }

            //Int + String
            if (exp2 instanceof Cadena) {
                let valor1: number = exp1.valor_1;
                let valor2: string = exp2.valor;
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }

            //Int + Int
            if (exp2 instanceof Entero) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Entero(suma, this._linea);
            }

            //Int + Char
            if (exp2 instanceof Char) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valorNumerico();
                let suma = valor1 + valor2;
                return new Entero(suma, this._linea);
            }
        }

        if (exp1 instanceof Char) {
            //Char + Boolean
            if (exp2 instanceof Boolean) {
                Errores.getInstance().push(new Error("semantico", this._linea, "No se puede sumar Char con un Boolean"));
            }

            //Char + Double
            if (exp2 instanceof Decimal) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Decimal(suma, this._linea);
            }

            //Char + String
            if (exp2 instanceof Cadena) {
                let valor1: string = exp1.valor;
                let valor2: string = exp2.valor;
                let suma = valor1 + valor2;
                return new Cadena(suma, this._linea);
            }

            //Char + Int
            if (exp2 instanceof Entero) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valor_1;
                let suma = valor1 + valor2;
                return new Entero(suma, this._linea);
            }

            //Char + Char
            if (exp2 instanceof Char) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valorNumerico();
                let suma = valor1 + valor2;
                return new Entero(suma, this._linea);
            }
        }

        return;
    }

}