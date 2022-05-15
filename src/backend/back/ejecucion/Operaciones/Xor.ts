import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Errores } from 'src/backend/back/ejecucion/Errores/Errores';
import { Error } from 'src/backend/back/ejecucion/Errores/Error';
import { Boolean } from '../Valores/Boolean';
export class Xor extends Instruccion {
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
            let valor1 = exp1.valor_1;
            let valor2 = exp2.valor_1;
            let resultado = (valor1 && !valor2) || (!valor1 && valor2);
            return new Boolean(resultado, this._linea);
        } else {
            Errores.getInstance().push(new Error("Semantico", this._linea, "Solo se puede realizar operaciones logicas entre Boolean"));
        }
        return
    }

}