import { Asignacion } from '../Declaraciones/Asignacion';
import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { DeclaracionVar } from '../Declaraciones/DeclaracionVar';
import { Boolean } from '../Valores/Boolean';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
import { InsRetorno } from '../flujo/InsRetorno';
import { InsDetener } from '../flujo/InsDetener';
import { InsContinuar } from '../flujo/InsContinuar';
export class For extends Instruccion {
    private _condicion: Instruccion;
    private _incremento: Instruccion;
    private _instrucciones: Array<Instruccion>;
    private _variable: Instruccion | null;

    constructor(condicion: Instruccion, incremento: Instruccion, instrucciones: Array<Instruccion>, variable: Instruccion | null, linea: string) {
        super(linea);
        this._condicion = condicion;
        this._incremento = incremento;
        this._instrucciones = instrucciones;
        this._variable = variable;
    }

    ejecutar(e: Entorno) {
        console.log(this._condicion);
        console.log(this._incremento);
        console.log(this._instrucciones);
        console.log(this._variable);

        const entornoDeclaracion = new Entorno(e);
        if (this._variable instanceof Asignacion) {
            this._variable.ejecutar(entornoDeclaracion);
        } else if (this._variable instanceof DeclaracionVar) {
            this._variable.ejecutar(entornoDeclaracion);
        }

        let valCon = this._condicion.ejecutar(entornoDeclaracion);
        if (!(valCon instanceof Boolean)) {
            Errores.getInstance().push(new Error('semantico', this._linea, `Condicion invalida`));
            return;
        }

        //Evaluo la condicion para ejecutar el ciclo for
        while ((this._condicion.ejecutar(entornoDeclaracion) as Boolean).valor_1) {
            //Entorno generado por el ciclo for

            const entorno_for = new Entorno(entornoDeclaracion);
            //Ejecuto las instrucciones del ciclo for
            for (let instruccion of this._instrucciones) {
                const resp = instruccion.ejecutar(entorno_for);
                //Validacion de instruccion Return
                if (resp instanceof InsRetorno) {
                    return resp;
                }
                //Validacion de instrucion Break
                if (resp instanceof InsDetener) {
                    return;
                }
                //Validacion instruccion Continue
                if (resp instanceof InsContinuar) {
                    break;
                }
            }

            //incremento / decremento
            this._incremento.ejecutar(entornoDeclaracion);
        }
        return
    }
}