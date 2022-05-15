import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Cadena } from '../Valores/Cadena';
import { Char } from '../Valores/Char';
import { Decimal } from '../Valores/Decimal';
import { Entero } from '../Valores/Entero';
import { Boolean } from '../Valores/Boolean';
import { Errores } from 'src/backend/back/ejecucion/Errores/Errores';
import { Error } from 'src/backend/back/ejecucion/Errores/Error';
export class Division extends Instruccion {
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
            Errores.getInstance().push(new Error("semantico", this._linea, "No se puede realizar una division con null"));
            return;
        }

        if (exp1 instanceof Boolean) {
            //Boolean / Boolean
            if (exp2 instanceof Boolean) {
                Errores.getInstance().push(new Error("semantico", this._linea, "No se puede realizar una division entre Boolean y Boolean"));
            }

            //Boolean / Double
            if (exp2 instanceof Decimal) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valor_1;
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Boolean / String
            if (exp2 instanceof Cadena) {
                Errores.getInstance().push(new Error("semantico", this._linea, "No se puede realizar una division entre Boolean y String"));
            }

            //Boolean / Int
            if (exp2 instanceof Entero) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valor_1;
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Boolean / Char
            if (exp2 instanceof Char) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre Boolean y Char"));
            }
        }

        if (exp1 instanceof Decimal) {
            //Double / Boolean
            if (exp2 instanceof Boolean) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valorNumerico();
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Double / Double
            if (exp2 instanceof Decimal) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valor_1;
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Double / String
            if (exp2 instanceof Cadena) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre Double y String"));
            }

            //Double / Int
            if (exp2 instanceof Entero) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valor_1;
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Double / Char
            if (exp2 instanceof Char) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valorNumerico();
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }
        }

        if (exp1 instanceof Cadena) {
            //String / Boolean
            if (exp2 instanceof Boolean) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre String y Boolean"));
            }

            //String / Double
            if (exp2 instanceof Decimal) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre String y Double"));
            }

            //String / String
            if (exp2 instanceof Cadena) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre String y String"));
            }

            //String / Int
            if (exp2 instanceof Entero) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre String y Int"));
            }

            //String / Char
            if (exp2 instanceof Char) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre String y Char"));
            }
        }

        if (exp1 instanceof Entero) {
            //Int / Boolean
            if (exp2 instanceof Boolean) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valorNumerico();
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Int / Double
            if (exp2 instanceof Decimal) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valor_1;
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Int / String
            if (exp2 instanceof Cadena) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre Int y String"));
            }

            //Int / Int
            if (exp2 instanceof Entero) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valor_1;
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Int / Char
            if (exp2 instanceof Char) {
                let valor1: number = exp1.valor_1;
                let valor2: number = exp2.valorNumerico();
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }
        }

        if (exp1 instanceof Char) {
            //Char / Boolean
            if (exp2 instanceof Boolean) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre Char y Boolean"));
            }

            //Char / Double
            if (exp2 instanceof Decimal) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valor_1;
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Char / String
            if (exp2 instanceof Cadena) {
                Errores.getInstance().push(new Error("sintactico", this._linea, "No se puede realizar una division entre Char y String"));
            }

            //Char / Int
            if (exp2 instanceof Entero) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valor_1;
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }

            //Char / Char
            if (exp2 instanceof Char) {
                let valor1: number = exp1.valorNumerico();
                let valor2: number = exp2.valorNumerico();
                let division = valor1 / valor2;
                return new Decimal(division, this._linea);
            }
        }

        return;
    }

}