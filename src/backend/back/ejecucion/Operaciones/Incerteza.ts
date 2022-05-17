import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Boolean } from '../Valores/Boolean';
import { Cadena } from '../Valores/Cadena';
import { Char } from '../Valores/Char';
import { Decimal } from '../Valores/Decimal';
import { Errores } from 'src/backend/back/ejecucion/Errores/Errores';
import { Error } from 'src/backend/back/ejecucion/Errores/Error';
import { Entero } from '../Valores/Entero';
export class Incerteza extends Instruccion {
    private _expIzq: Instruccion;
    private _expDer: Instruccion;
    private _incertezaDafault: number = 0.5;

    constructor(expIzq: Instruccion, expDer: Instruccion, linea: string) {
        super(linea);
        this._expIzq = expIzq;
        this._expDer = expDer;
    }

    ejecutar(e: Entorno) {
        const exp1 = this._expIzq.ejecutar(e);
        const exp2 = this._expDer.ejecutar(e);
        let valIncerteza: number;
        const variable = e.getVariable("incerteza");
        if (!variable) {
            valIncerteza = this._incertezaDafault;
        } else {
            let exp = variable.valor?.ejecutar(e);
            valIncerteza = exp.valor_1;
        }

        if (exp1 instanceof Boolean && exp2 instanceof Boolean) {
            Errores.getInstance().push(new Error("Semantico", this._linea, "No se puede realizar la incerteza entre Boolean"));
        } else if ((exp1 instanceof Decimal && exp2 instanceof Decimal) ||
            (exp1 instanceof Decimal && exp2 instanceof Entero)) {
            let valor1 = exp1.valor_1;
            let valor2 = exp2.valor_1;
            let resultado = false;
            if (Math.abs(valor1 - valor2) <= valIncerteza) {
                resultado = true;
            }
            return new Boolean(resultado, this._linea);
        } else if (exp1 instanceof Cadena && exp2 instanceof Cadena) {
            let valor1 = exp1.valor.trim().toLowerCase();
            let valor2 = exp2.valor.trim().toLowerCase();
            let resultado = valor1 == valor2;
            return new Boolean(resultado, this._linea);
        } else if ((exp1 instanceof Entero && exp2 instanceof Entero) ||
            (exp1 instanceof Entero && exp2 instanceof Decimal)) {
            let valor1 = exp1.valor_1;
            let valor2 = exp2.valor_1;
            let resultado = false;
            if (Math.abs(valor1 - valor2) <= valIncerteza) {
                resultado = true;
            }
            return new Boolean(resultado, this._linea);
        } else if (exp1 instanceof Char && exp2 instanceof Char) {
            Errores.getInstance().push(new Error("Semantico", this._linea, "No se puede realizar la incerteza entre Char"));
        } else {
            Errores.getInstance().push(new Error("Semantico", this._linea, "No se puede realizar la comparacion incerteza con estos tipos"));
        }
        return
    }

}