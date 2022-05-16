import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Boolean } from '../Valores/Boolean';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
import { Retorno } from '../flujo/Retorno';
import { Detener } from '../flujo/Detener';
import { Continuar } from '../flujo/Continuar';
export class Mientras extends Instruccion {
    private _condicion: Instruccion;
    private _instrucciones: Array<Instruccion>;

    constructor(condicion: Instruccion, instrucciones: Array<Instruccion>, linea: string) {
        super(linea);
        this._condicion = condicion;
        this._instrucciones = instrucciones;
    }

    ejecutar(e: Entorno) {
        const condicion = this._condicion.ejecutar(e);
        if(!(condicion instanceof Boolean)){
            Errores.getInstance().push(new Error('semantico', this._linea, `Condicion invalida`));
            return;
        }

        while ((this._condicion.ejecutar(e) as Boolean).valor_1) {
            //Creacion de entorno
            const entorno = new Entorno(e);
            //Ejecucion de instrucciones
            for (let instruccion of this._instrucciones) {
                const resp = instruccion.ejecutar(entorno);
                ///Validacion de instruccion Return
                if (resp instanceof Retorno) {
                    return resp;
                }
                //Validacion de instrucion Break
                if (resp instanceof Detener) {
                    return;
                }
                //Validacion de instruccion Continue
                if (resp instanceof Continuar) {
                    break;
                }
            }
        }
        return
    }
}