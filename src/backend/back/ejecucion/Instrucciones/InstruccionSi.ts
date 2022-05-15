import { Entorno } from "../Entorno";
import { Instruccion } from "../Instruccion";
import { Boolean } from "../Valores/Boolean";
import { Si } from "./Si";
import { Errores } from 'src/backend/back/ejecucion/Errores/Errores';
import { Error } from 'src/backend/back/ejecucion/Errores/Error';
import { Detener } from "../flujo/Detener";
import { Continuar } from '../flujo/Continuar';
import { Retorno } from "../flujo/Retorno";
export class InstruccionSi extends Instruccion {
    private _sis: Array<Si>;

    constructor(sis: Array<Si>, linea: string) {
        super(linea);
        this._sis = sis;
    }

    ejecutar(e: Entorno) {
        for (let insIf of this._sis) {
            const condicion = insIf.condicion.ejecutar(e);
            const instrucciones = insIf.instrucciones;

            if (condicion instanceof Boolean) {
                if (condicion.valor_1) {
                    const entorno = new Entorno(e);
                    //Ejecucion de las intstrucciones dentro del Si
                    for (let instruccion of instrucciones) {
                        const resp = instruccion.ejecutar(entorno);
                        //Validacion de sentencias Break, Continue o Return
                        if (resp instanceof Detener || resp instanceof Continuar || resp instanceof Retorno) {
                            return resp;
                        }
                    }
                    return
                }
            } else {
                Errores.getInstance().push(new Error("Semantico", this._linea, "La condicion del Si debe ser de tipo Boolean"));
            }
        }
        return
    }
}