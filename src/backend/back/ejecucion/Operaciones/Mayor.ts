import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Boolean } from '../Valores/Boolean';
import { Cadena } from '../Valores/Cadena';
import { Char } from '../Valores/Char';
import { Decimal } from '../Valores/Decimal';
import { Errores } from 'src/backend/back/ejecucion/Errores/Errores';
import { Error } from 'src/backend/back/ejecucion/Errores/Error';
import { Entero } from '../Valores/Entero';
export class Mayor extends Instruccion {
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

        if (exp1 instanceof Boolean && exp2 instanceof Boolean) {
            let valor1 = exp1.valorNumerico();
            let valor2 = exp2.valorNumerico();
            let resultado = valor1 > valor2;
            return new Boolean(resultado, this._linea);
        } else if ((exp1 instanceof Decimal && exp2 instanceof Decimal) ||
        (exp1 instanceof Decimal && exp2 instanceof Entero)) {
            let valor1 = exp1.valor_1;
            let valor2 = exp2.valor_1;
            let resultado = valor1 > valor2;
            return new Boolean(resultado, this._linea);
        } else if (exp1 instanceof Cadena && exp2 instanceof Cadena) {
            let valor1 = exp1.valor;
            let valor2 = exp2.valor;
            let resultado = this.evaluarCadenas(valor1, valor2);
            return new Boolean(resultado, this._linea);
        } else if ((exp1 instanceof Entero && exp2 instanceof Entero) ||
        (exp1 instanceof Entero && exp2 instanceof Decimal)) {
            let valor1 = exp1.valor_1;
            let valor2 = exp2.valor_1;
            let resultado = valor1 > valor2;
            return new Boolean(resultado, this._linea);
        } else if (exp1 instanceof Char && exp2 instanceof Char) {
            let valor1 = exp1.valorNumerico();
            let valor2 = exp2.valorNumerico();
            let resultado = valor1 > valor2;
            return new Boolean(resultado, this._linea);
        } else {
            Errores.getInstance().push(new Error("Semantico", this._linea, "No se puede realizar la comparacion entre diferentes tipos"));
        }
        return
    }

    private evaluarCadenas(cad1: string, cad2: string): boolean {
        let resultado: boolean = false;
        let iteraciones: number = (cad1.length > cad2.length) ? cad2.length : cad1.length;

        for (let i = 0; i < iteraciones; i++) {
            let val1 = cad1.charCodeAt(i);
            let val2 = cad2.charCodeAt(i);
            if (val1 > val2) {
                resultado = true;
                break;
            }
        }

        if (!resultado) {
            resultado = cad1.length > cad2.length;
        }

        return resultado;
    }

}