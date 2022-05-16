import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
import { Variable } from '../Declaraciones/Variable';
import { EntornoAux } from '../EntornoAux';
import { InsRetorno } from '../flujo/InsRetorno';
import { Detener } from '../flujo/Detener';
import { Continuar } from '../flujo/Continuar';
import { InsDetener } from '../flujo/InsDetener';
import { InsContinuar } from '../flujo/InsContinuar';
export class LlamadaFuncion extends Instruccion {
    private _id: string;
    private parametros: Array<Instruccion>;

    constructor(id: string, parametros: Array<Instruccion>, linea: string) {
        super(linea);
        this._id = id;
        this.parametros = parametros;
    }

    ejecutar(e: Entorno) {
        const entornoAux = new Entorno();
        const entornoLocal = new Entorno(e);

        const funcion = e.getFuncion(this._id)

        //Si no existe la funcion
        if (!funcion) {
            Errores.getInstance().push(new Error('semantico', this._linea, `La funcion ${this._id} no esta declarada`));
            return;
        }

        //Si existen parametros
        if (this.parametros.length > 0) {
            if (!funcion.tieneParametros()) {
                Errores.getInstance().push(new Error('semantico', this._linea, `La funcion ${this._id} no recibe parametros`));
                return;
            }
            //Si el numero de parametros es el mismo a al numero de argumentos
            if (this.parametros.length != funcion.parametros.length) {
                Errores.getInstance().push(new Error('semantico', this._linea, `La funcion ${this._id} no esta declarada`));
                return;
            }

            //Declaracion de parametros
            for (let i = 0; i < this.parametros.length; i++) {
                const exp = this.parametros[i];
                const variable: Variable = funcion.parametros[i]; //Tipo Variable

                const valor = exp.ejecutar(entornoLocal); //Tipo Boolean,Caracter,Entero...

                //Si el tipo del argumento es el mismo al del parametro
                if (valor != null && variable.tipo != valor.tipo) {
                    Errores.getInstance().push(new Error('semantico', this._linea, `El tipo del valor a enviar no es el mismo al parametro ${variable.id} de la funcion ${this._id}`));
                    return;
                }

                variable.valor = valor;
                entornoAux.setVariable(variable);
            }
        } else {//Si no tiene parametros
            //Si la llamada no tiene parametros pero la funcion si espera.
            if (funcion.tieneParametros()) {
                Errores.getInstance().push(new Error('semantico', this._linea, `La funcion ${this._id} debe recibir ${funcion.numParametros()} parametros`));
                return;
            }
        }

        entornoLocal.variables = entornoAux.variables;

        entornoLocal.padre = e.getEntornoGlobal();

        EntornoAux.getInstance().inicioEjecucionFuncion();

        //Ejecucion de las instrucciones
        for (let instruccion of funcion.instrucciones) {
            const resp = instruccion.ejecutar(entornoLocal);

            if (resp instanceof InsRetorno) {
                if (funcion.tieneReturn() && resp.tieneValor()) {
                    //Validacion tipo retorno
                    let val = resp.valor;
                    if (val != null && val.tipo != funcion.tipoReturn) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `Tipo de retorno invalido`));
                        EntornoAux.getInstance().finEjecucionFuncion();
                        return;
                    }
                    //Retorno de valor
                    EntornoAux.getInstance().finEjecucionFuncion();
                    return val;
                }

                //Retorno sin valor Y necesita retornar un valor
                if (funcion.tieneReturn() && !resp.tieneValor()) {
                    Errores.getInstance().push(new Error('semantico', this._linea, `La funcion ${this._id} debe retornar un valor`));
                    EntornoAux.getInstance().finEjecucionFuncion();
                    return;
                }

                //Retorno con valor Y no necesita retornar un valor
                if (!funcion.tieneReturn() && resp.tieneValor()) {
                    Errores.getInstance().push(new Error('semantico', this._linea, `La funcion ${this._id} no debe retornar un valor`));
                    EntornoAux.getInstance().finEjecucionFuncion();
                    return;
                }

                //Return simple
                EntornoAux.getInstance().finEjecucionFuncion();
                return;
            }

            if (resp instanceof InsDetener || resp instanceof InsContinuar) {
                Errores.getInstance().push(new Error('semantico', this._linea, `La instruccion Detener/Continuar solo se puede usar en ciclos`));
                EntornoAux.getInstance().finEjecucionFuncion();
                return;
            }
        }

        //Si no rotorna nada y se espera un retorno
        if (funcion.tieneReturn()) {
            Errores.getInstance().push(new Error('semantico', this._linea, `La funcion ${this._id} debe retornar un valor`));
            EntornoAux.getInstance().finEjecucionFuncion();
            return;
        }

        EntornoAux.getInstance().finEjecucionFuncion();

    }
}