import { NodoAST } from '../arbol/NodoAST';
import { Entorno } from './Entorno';
import { Instruccion } from './Instruccion';
import { Entornos } from './Entornos';
import { Salida } from './Salida';
export class Ejecucion {
    _raiz: NodoAST;
    _contador: number = 0;
    _dot: string = "";

    constructor(raiz: NodoAST) {
        this._raiz = raiz;
    }

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
        if (instrucciones instanceof Array) {
            const entorno = new Entorno();
            Salida.getInstance().clear();
            instrucciones.forEach(element => {
                if (element instanceof Instruccion) {
                    try {
                        element.ejecutar(entorno);
                    } catch (error) {
                        console.log("Error al pasar el entorno")
                    }
                }
            });
            Entornos.getInstance().push(entorno);
        }
    }

    getSalida(): String[] {
        return Salida.getInstance().lista;
    }

    recorrer(nodo: NodoAST): any {
        //INICIO
        if (nodo.valor == "INICIO") {
            console.log("Nodo INICIO");
            return this.recorrer(nodo.hijos[0]);
        }

        //INSTRUCCIONES
        if (nodo.valor == "INSTRUCCIONES") {
            console.log("Nodo INSTRUCCIONES")
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

        if (nodo.valor == "INSTRUCCION") {
            console.log("Nodo INSTRUCCION");
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

        //DECLARACIONES
        //DECLARACIONES_VAR
        if (nodo.valor == "DECLARACION_VAR") {
            console.log("Nodo DECLARACION_VAR");
            //TIPO_VARIABLE_NATIVA id
            //TIPO_VARIABLE_NATIVA id coma IDS asig EXP
            //TIPO_VARIABLE_NATIVA id asig EXP
        }

        //DECLARACIONES_FUN
        if (nodo.valor == "DECLARACION_FUN") {
            console.log("Nodo DECLARACION_FUN");
        }

        //DIBUJAR_AST
        if (nodo.valor == "DIBUJAR_AST") {
            console.log("Nodo DIBUJAR_AST");
        }

        //DIBUJAR_EXP
        if (nodo.valor == "DIBUJAR_EXP") {
            console.log("Nodo DIBUJAR_EXP");
        }

        //DIBUJAR_TS
        if (nodo.valor == "DIBUJAR_TS") {
            console.log("Nodo DIBUJAR_TS");
        }

        //CONTINUAR
        if (nodo.valor == "CONTINUAR") {
            console.log("Nodo CONTINUAR");
        }

        //DETENER
        if (nodo.valor == "DETENER") {
            console.log("Nodo DETENER");
        }

        //MIENTRAS
        if (nodo.valor == "MIENTRAS") {
            console.log("Nodo MIENTRAS");
        }

        //PARA
        if (nodo.valor == "PARA") {
            console.log("Nodo PARA");
        }

        //OP
        if (nodo.valor == "OP") {
            console.log("Nodo OP");
        }

        //MOSTRAR
        if (nodo.valor == "MOSTRAR") {
            // console.log("Nodo MOSTRAR");
            // //mostrar par_a LISTA_EXPRESIONES par_c
            // const lista = this.recorrer(nodo.hijos[2]) as Array<Instruccion>;
            // return new Log(nodo.linea, lista);
        }

        //INSTRUCCION_SI
        if (nodo.valor == "INSTRUCCION_SI") {
            console.log("Nodo INSTRUCCION_SI");
        }

        //INSTRUCCION_SINO
        if (nodo.valor == "INSTRUCCION_SINO") {
            console.log("Nodo INSTRUCCION_SINO");
        }

        //RETORNO
        if (nodo.valor == "RETORNO") {
            console.log("Nodo RETORNO");
        }

        //DECLARACIONES
        if (nodo.valor == "DECLARACIONES") {
            console.log("Nodo DECLARACIONES");
        }

        //LISTA_PARAMETROS
        if (nodo.valor == "LISTA_PARAMETROS") {
            console.log("Nodo LISTA_PARAMETROS");
        }

        //PARAMETRO
        if (nodo.valor == "PARAMETRO") {
            console.log("Nodo PARAMETRO");
        }

        //ASIGNACION
        if (nodo.valor == "ASIGNACION") {
            console.log("Nodo ASIGNACION");
        }

        //TIPO_IGUAL
        if (nodo.valor == "TIPO_IGUAL") {
            console.log("Nodo TIPO_IGUAL");
        }

        //IDS
        if (nodo.valor == "IDS") {
            console.log("Nodo IDS");
        }

        //TIPO_VARIABLE_NATIVA
        if (nodo.valor == "TIPO_VARIABLE_NATIVA") {
            console.log("Nodo TIPO_VARIABLE_NATIVA");
        }

        //EXP
        if (nodo.valor == "EXP") {
            console.log("Nodo EXP");
        }

        //LLAMADA_FUNCION
        if (nodo.valor == "LLAMADA_FUNCION") {
            console.log("Nodo LLAMADA_FUNCION")
        }

        //LISTA_EXPRESIONES
        if (nodo.valor == "LISTA_EXPRESIONES") {
            console.log("Nodo LISTA_EXPRESIONES");
            // //EXP coma EXP
            // const lista: any = [];
            // nodo.hijos.forEach((nodoHijo: NodoAST) => {
            //     const exp = this.recorrer(nodoHijo);
            //     lista.push(exp);
            // });
            // return lista;
        }
    }

}