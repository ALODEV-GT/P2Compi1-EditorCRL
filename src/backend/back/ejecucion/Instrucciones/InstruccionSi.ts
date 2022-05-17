import { Entorno } from "../Entorno";
import { Instruccion } from "../Instruccion";
import { Boolean } from "../Valores/Boolean";
import { Si } from "./Si";
import { Errores } from 'src/backend/back/ejecucion/Errores/Errores';
import { Error } from 'src/backend/back/ejecucion/Errores/Error';
import { InsDetener } from "../flujo/InsDetener";
import { InsContinuar } from '../flujo/InsContinuar';
import { InsRetorno } from '../flujo/InsRetorno';
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
                        if (resp instanceof InsDetener || resp instanceof InsContinuar || resp instanceof InsRetorno) {
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