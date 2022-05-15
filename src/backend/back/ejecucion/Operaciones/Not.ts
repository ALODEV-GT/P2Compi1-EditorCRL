import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Errores } from 'src/backend/back/ejecucion/Errores/Errores';
import { Error } from 'src/backend/back/ejecucion/Errores/Error';
import { Boolean } from '../Valores/Boolean';
export class Not extends Instruccion {
    private _exp: Instruccion;

    constructor(exp: Instruccion, linea: string) {
        super(linea);
        this._exp = exp;
    }

    ejecutar(e: Entorno) {
        const exp1 = this._exp.ejecutar(e);

        if(exp1 instanceof Boolean){
            let valor1 = exp1.valor_1;
            let resultado = !valor1;
            return new Boolean(resultado, this._linea);
        }else{
            Errores.getInstance().push(new Error("Semantico", this._linea, "Solo se puede realizar operaciones logicas con Boolean"));
        }
        return
    }

}