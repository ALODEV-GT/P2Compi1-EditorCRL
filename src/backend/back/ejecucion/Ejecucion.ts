import { NodoAST } from '../arbol/NodoAST';
import { Entorno } from './Entorno';
import { Instruccion } from './Instruccion';
import { Entornos } from './Entornos';
import { Salida } from './Salida';
import { TiposNativos } from './Declaraciones/TiposNativo';
import { Id } from './Valores/Id';
import { Decimal } from './Valores/Decimal';
import { Entero } from './Valores/Entero';
import { Boolean } from './Valores/Boolean';
import { Cadena } from './Valores/Cadena';
import { DeclaracionVar } from './Declaraciones/DeclaracionVar';
import { Char } from './Valores/Char';
import { Multiplicacion } from './Operaciones/Multiplicacion';
import { Not } from './Operaciones/Not';
import { Suma } from './Operaciones/Suma';
import { Resta } from './Operaciones/Resta';
import { Division } from './Operaciones/Division';
import { Mod } from './Operaciones/Mod';
import { Potencia } from './Operaciones/Potencia';
import { Mayor } from './Operaciones/Mayor';
import { Menor } from './Operaciones/Menor';
import { MayorIgual } from './Operaciones/MayorIgual';
import { MenorIgual } from './Operaciones/MenorIgual';
import { Igual } from './Operaciones/Igual';
import { Diferente } from './Operaciones/Diferente';
import { Incerteza } from './Operaciones/Incerteza';
import { And } from './Operaciones/And';
import { Or } from './Operaciones/Or';
import { Xor } from './Operaciones/Xor';
import { Parametro } from './Funciones/Parametro';
import { DeclaracionFuncion } from './Funciones/DeclaracionFuncion';
import { Principal } from './Funciones/Principal';
import { Retorno } from './flujo/Retorno';
import { Continuar } from './flujo/Continuar';
import { Detener } from './flujo/Detener';
import { DibujarAST } from './Funciones/DibujarAST';
import { DibujarEXP } from './Funciones/DibujarEXP';
import { DibujarTS } from './Funciones/DibujarTS';
import { Mientras } from './Instrucciones/Mientras';
import { Asignacion } from './Declaraciones/Asignacion';
import { For } from './Instrucciones/For';
import { Mostrar } from './Instrucciones/Mostrar';
import { LlamadaFuncion } from './Funciones/LLamadaFuncion';
export class Ejecucion {
    _raiz: NodoAST;
    _contador: number = 0;
    _dot: string = "";

    constructor(raiz: NodoAST) {
        this._raiz = raiz;
    }

    /**
     * Esta funcionalidad no es parte de las funcionalidades del proyecto, sin embargo
     * es util para observar de manera grafica como esta construido el arbol sintactico.
     */
    getDot(): string {
        this._dot = 'digraph G{';
        if (this._raiz != null) {
            this.generacionDot(this._raiz);
        }
        this._dot += '}';
        return this._dot;
    }

    private generacionDot(nodo: NodoAST): void {
        let idPadre = this._contador;
        this._dot += `node${idPadre}[label="${this.formatear(nodo.valor)}"];`
        nodo.hijos.forEach((nodoHijo: NodoAST) => {
            let idHijo = ++this._contador;
            this._dot += `node${idPadre} -> node${idHijo};`;
            //${this.formatear(nodoHijo.valor)}; 
            this.generacionDot(nodoHijo);
        });
    }

    private formatear(valor: string): string {
        if (valor.startsWith("\"") || valor.startsWith("'") || valor.startsWith("`")) {
            return valor.substr(1, valor.length - 2);
        }
        return valor;
    }

    ejecutar() {
        const instrucciones = this.recorrer(this._raiz);
        console.log(instrucciones);
        // const entorno = new Entorno();
        // Salida.getInstance().clear();
        // instrucciones.forEach((element: any) => {
        //     if (element instanceof Instruccion) {
        //         try {
        //             element.ejecutar(entorno);
        //         } catch (error) {
        //             console.log("Error al ejecutar");
        //         }
        //     }
        // });
    }

    recorrer(nodo: NodoAST): any {
        //INICIO
        if (nodo.valor == "INICIO") {
            return this.recorrer(nodo.hijos[0]);
        }

        //INSTRUCCIONES
        if (nodo.valor == "INSTRUCCIONES") {
            let instrucciones: any[] = [];
            //Recorrer declaraciones de funciones y variables globales
            nodo.hijos.forEach((nodoHijo: NodoAST) => {
                if (nodoHijo.valor == "DECLARACION_FUN") {
                    const inst = this.recorrer(nodoHijo);
                    if (inst instanceof Array) {
                        instrucciones = instrucciones.concat(inst);
                    } else {
                        instrucciones.push(inst);
                    }
                }
            });

            //Recorrido de otras instrucciones
            nodo.hijos.forEach((nodoHijo: NodoAST) => {
                if (!(nodoHijo.valor == "DECLARACION_FUN")) {
                    const inst = this.recorrer(nodoHijo);
                    if (inst instanceof Array) {
                        instrucciones = instrucciones.concat(inst);
                    } else {
                        instrucciones.push(inst);
                    }
                }
            });
            return instrucciones;
        }

        if (nodo.valor == "INSTRUCCION") {
            let instrucciones: any[] = [];
            nodo.hijos.forEach((nodoHijo: NodoAST) => {
                const inst = this.recorrer(nodoHijo);
                if (inst instanceof Array) {
                    instrucciones = instrucciones.concat(inst);
                } else {
                    instrucciones.push(inst);
                }
            });
            return instrucciones;
        }

        //DECLARACIONES_VAR
        if (nodo.valor == "DECLARACION_VAR") {
            //TIPO_VARIABLE_NATIVA id
            const tipo: TiposNativos = this.recorrer(nodo.hijos[0]);
            let ids: string[] = [];
            ids.push((this.recorrer(nodo.hijos[1]) as Id).id);
            let exp: Instruccion | null = null;
            switch (nodo.hijos.length) {
                case 4: //TIPO_VARIABLE_NATIVA id asig EXP
                    exp = this.recorrer(nodo.hijos[3]);
                    break;
                case 6: //TIPO_VARIABLE_NATIVA id coma IDS asig EXP
                    ids = ids.concat(this.recorrer(nodo.hijos[3]));
                    exp = this.recorrer(nodo.hijos[5])
                    break;
            }
            return new DeclaracionVar(tipo, ids, exp, nodo.linea);
        }

        //EXP
        if (nodo.valor == "EXP") {
            switch (nodo.hijos.length) {
                case 1:
                    //Nativos
                    //Llamada a funcion
                    //par_a EXP par_c
                    return this.recorrer(nodo.hijos[0]);
                case 2:
                    //menos EXP %prec umenos
                    if (nodo.hijos[0].tipo == "resta" && nodo.hijos[1].valor == "EXP") {
                        const expIzq: Instruccion = new Entero(-1, nodo.linea);
                        const expDer: Instruccion = this.recorrer(nodo.hijos[1]);
                        return new Multiplicacion(expIzq, expDer, nodo.linea);
                    }
                    //not EXP 			
                    if (nodo.hijos[0].tipo == "not" && nodo.hijos[1].valor == "EXP") {
                        const exp: Instruccion = this.recorrer(nodo.hijos[1]);
                        return new Not(exp, nodo.linea);
                    }
                    break;
                case 3:
                    //EXP mas EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'suma' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Suma(expIzq, expDer, nodo.linea);
                    }
                    //EXP menos EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'resta' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Resta(expIzq, expDer, nodo.linea);
                    }
                    //EXP por EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'producto' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Multiplicacion(expIzq, expDer, nodo.linea);
                    }
                    //EXP div EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'division' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Division(expIzq, expDer, nodo.linea);
                    }
                    //EXP mod EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'mod' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Mod(expIzq, expDer, nodo.linea);
                    }
                    //EXP pot EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'potencia' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Potencia(expIzq, expDer, nodo.linea);
                    }
                    //EXP mayor EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'mayor' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Mayor(expIzq, expDer, nodo.linea);
                    }
                    //EXP menor EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'menor' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Menor(expIzq, expDer, nodo.linea);
                    }
                    //EXP mayor_igual EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'mayor_igual' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new MayorIgual(expIzq, expDer, nodo.linea);
                    }
                    //EXP menor_igual EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'menor_igual' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new MenorIgual(expIzq, expDer, nodo.linea);
                    }
                    //EXP igual EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'igual' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Igual(expIzq, expDer, nodo.linea);
                    }
                    //EXP dif EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'dif' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Diferente(expIzq, expDer, nodo.linea);
                    }
                    //EXP sig_inc EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'sig_inc' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Incerteza(expIzq, expDer, nodo.linea);
                    }
                    //EXP and EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'and' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new And(expIzq, expDer, nodo.linea);
                    }
                    //EXP or EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'or' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Or(expIzq, expDer, nodo.linea);
                    }
                    //EXP xor EXP
                    if (nodo.hijos[0].valor == "EXP" && nodo.hijos[1].tipo == 'xor' && nodo.hijos[2].valor == "EXP") {
                        const expIzq = this.recorrer(nodo.hijos[0]);
                        const expDer = this.recorrer(nodo.hijos[2]);
                        return new Xor(expIzq, expDer, nodo.linea);
                    }
            }
        }

        //id
        if (nodo.tipo == "id") {
            return new Id(nodo.valor, nodo.linea);
        }

        //ENTERO
        if (nodo.tipo == "ENTERO") {
            return new Entero(Number(nodo.valor), nodo.linea);
        }

        //DECIMAL
        if (nodo.tipo == "DECIMAL") {
            return new Decimal(Number(nodo.valor), nodo.linea);
        }

        //BOOLEAN
        if (nodo.tipo == "BOOLEAN") {
            if (nodo.valor == "true") {
                return new Boolean(true, nodo.linea);
            }
            return new Boolean(false, nodo.linea);
        }

        //CADENA
        if (nodo.tipo == "CADENA") {
            return new Cadena(nodo.valor, nodo.linea);
        }

        //CHAR
        if (nodo.tipo == "CHAR") {
            return new Char(nodo.valor, nodo.linea);
        }

        //DECLARACIONES_FUN
        if (nodo.valor == "DECLARACION_FUN") {
            //TIPO_VARIABLE_NATIVA id par_a par_c dos_p
            const tipo: TiposNativos = this.recorrer(nodo.hijos[0]);
            let id: string = (this.recorrer(nodo.hijos[1]) as Id).id;
            let parametros: Parametro[] = [];
            let instrucciones: [] = [];
            //TIPO_VARIABLE_NATIVA id par_a LISTA_PARAMETROS par_c dos_p
            if (nodo.hijos.length >= 6) {
                parametros = this.recorrer(nodo.hijos[3]);
            }

            if (nodo.hijos.length == 6 || nodo.hijos.length == 7) {
                instrucciones = this.recorrer(nodo.hijos[nodo.hijos.length - 1]);
            }

            return new DeclaracionFuncion(tipo, id, parametros, instrucciones, nodo, nodo.linea);
        }

        //LISTA_PARAMETROS
        if (nodo.valor == "LISTA_PARAMETROS") {
            let parametros: Parametro[] = [];
            console.log("debug")
            switch (nodo.hijos.length) {
                case 1:
                    parametros.push(this.recorrer(nodo.hijos[0]));
                    return parametros;
                case 3:
                    parametros = parametros.concat(this.recorrer(nodo.hijos[0]));
                    parametros.push(this.recorrer(nodo.hijos[2]));
                    return parametros;
            }
        }

        //PARAMETRO
        if (nodo.valor == "PARAMETRO") {
            const tipo: TiposNativos = this.recorrer(nodo.hijos[0]);
            let id: string = (this.recorrer(nodo.hijos[1]) as Id).id;
            return new Parametro(tipo, id, nodo.linea);
        }

        //IDS
        if (nodo.valor == "IDS") {
            let ids: string[] = []
            switch (nodo.hijos.length) {
                case 1:
                    ids.push(nodo.hijos[0].valor);
                    return ids;
                case 3:
                    ids = ids.concat(this.recorrer(nodo.hijos[0]));
                    ids.push(nodo.hijos[2].valor);
                    return ids;
            }
        }

        //TIPO_VARIABLE_NATIVA
        if (nodo.valor == "TIPO_VARIABLE_NATIVA") {
            switch (nodo.hijos[0].tipo) {
                case "double":
                    return TiposNativos.DOUBLE;
                case "boolean":
                    return TiposNativos.BOOLEAN;
                case "string":
                    return TiposNativos.STRING;
                case "int":
                    return TiposNativos.INT;
                case "char":
                    return TiposNativos.CHAR;
                case "void":
                    return TiposNativos.VOID;
            }
        }

        //FUNCION_PRINCIPAL
        if (nodo.valor == "FUNCION_PRINCIPAL") {
            //void principal par_a par_c dos_p
            let tipo: TiposNativos = TiposNativos.VOID;
            let id: string = "Principal"
            let instrucciones: Instruccion[] = [];
            if (nodo.hijos.length == 6) {
                instrucciones = this.recorrer(nodo.hijos[nodo.hijos.length - 1]);
            }
            return new Principal(tipo, id, instrucciones, nodo.linea);
        }

        //RETORNO
        if (nodo.valor == "RETORNO") {
            switch (nodo.hijos.length) {
                case 1:
                    //retorno
                    return new Retorno(null, nodo.linea);
                case 2:
                    //retorno EXP
                    const exp = this.recorrer(nodo.hijos[1]);
                    return new Retorno(exp, nodo.linea);
            }
        }

        //CONTINUAR
        if (nodo.valor == "CONTINUAR") {
            return new Continuar(nodo.linea);
        }

        //DETENER
        if (nodo.valor == "DETENER") {
            return new Detener(nodo.linea);
        }

        //DIBUJAR_AST
        if (nodo.valor == "DIBUJAR_AST") {
            let id: string = nodo.hijos[2].valor;
            return new DibujarAST(id, nodo.linea);
        }

        //DIBUJAR_EXP
        if (nodo.valor == "DIBUJAR_EXP") {
            //dib_exp par_a EXP par_c
            return new DibujarEXP(nodo.hijos[2], nodo.linea);
        }

        //DIBUJAR_TS
        if (nodo.valor == "DIBUJAR_TS") {
            return new DibujarTS(nodo.linea);
        }

        //MIENTRAS
        if (nodo.valor == "MIENTRAS") {
            //mientras par_a EXP par_c dos_p
            const condicion = this.recorrer(nodo.hijos[2]);
            let instrucciones: Instruccion[] = [];
            if (nodo.hijos.length == 6) {
                instrucciones = this.recorrer(nodo.hijos[nodo.hijos.length - 1]);
            }
            return new Mientras(condicion, instrucciones, nodo.linea);
        }

        //ASIGNACION
        if (nodo.valor == "ASIGNACION") {
            //id TIPO_IGUAL EXP
            const id = nodo.hijos[0].valor;
            const exp = this.recorrer(nodo.hijos[2]);
            return new Asignacion(id, exp, nodo.linea);
        }

        //TIPO_IGUAL
        if (nodo.valor == "TIPO_IGUAL") {
            return "=";
        }

        //PARA
        if (nodo.valor == "PARA") {
            let condicion: Instruccion;
            let instrucciones: Instruccion[] = [];
            let incremento: boolean;
            let variable: Instruccion | null = null;

            //para par_a TIPO_VARIABLE_NATIVA id asig EXP pyc EXP pyc OP par_c dos_p
            if (nodo.hijos.length >= 12) {
                condicion = this.recorrer(nodo.hijos[7]);
                incremento = this.recorrer(nodo.hijos[9]);
                let tipo: TiposNativos = this.recorrer(nodo.hijos[2]);
                let ids: string[] = [];
                ids.push(nodo.hijos[3].valor);
                let exp: Instruccion = this.recorrer(nodo.hijos[5]);
                variable = new DeclaracionVar(tipo, ids, exp, nodo.linea);
            } else { //para par_a ASIGNACION pyc EXP pyc OP par_c dos_p
                condicion = this.recorrer(nodo.hijos[4]);
                incremento = this.recorrer(nodo.hijos[6]);
                variable = this.recorrer(nodo.hijos[2]);
            }

            if (nodo.hijos.length == 13 || nodo.hijos.length == 10) {
                instrucciones = this.recorrer(nodo.hijos[nodo.hijos.length - 1]);
            }

            return new For(condicion, incremento, instrucciones, variable, nodo.linea);
        }

        //OP
        if (nodo.valor == "OP") {
            if (nodo.hijos[0].tipo == "inc") {
                return true;
            }
            return false;
        }

        //MOSTRAR
        if (nodo.valor == "MOSTRAR") {
            //mostrar par_a LISTA_EXPRESIONES par_c
            const expresiones: Instruccion[] = this.recorrer(nodo.hijos[2]);
            return new Mostrar(expresiones, nodo.linea);
        }

        //LISTA_EXPRESIONES
        if (nodo.valor == "LISTA_EXPRESIONES") {
            let expresiones: Instruccion[] = [];
            switch (nodo.hijos.length) {
                case 1:
                    //EXP
                    expresiones.push(this.recorrer(nodo.hijos[0]));
                    return expresiones;
                case 3:
                    //LISTA_EXPRESIONES coma EXP
                    expresiones = expresiones.concat(this.recorrer(nodo.hijos[0]));
                    expresiones.push(this.recorrer(nodo.hijos[2]));
                    return expresiones;
            }
        }

        //LLAMADA_FUNCION
        if (nodo.valor == "LLAMADA_FUNCION") {
            //id par_a par_c
            const id: string = nodo.hijos[0].valor;
            let parametros: Instruccion[] = [];

            //id par_a LISTA_EXPRESIONES par_c
            if (nodo.hijos.length == 4) {
                parametros = this.recorrer(nodo.hijos[2])
            }
            return new LlamadaFuncion(id, parametros, nodo.linea);
        }

        //----------------------------> aun faltan

        //INSTRUCCION_SI
        if (nodo.valor == "INSTRUCCION_SI") {
            console.log("Nodo INSTRUCCION_SI");
        }

        //INSTRUCCION_SINO
        if (nodo.valor == "INSTRUCCION_SINO") {
            console.log("Nodo INSTRUCCION_SINO");
        }
    }

    getSalida(): String[] {
        return Salida.getInstance().lista;
    }

}