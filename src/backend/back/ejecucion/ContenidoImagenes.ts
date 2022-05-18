import { NodoAST } from '../arbol/NodoAST';
import { Entorno } from './Entorno';
import { Decimal } from './Valores/Decimal';
import { Cadena } from './Valores/Cadena';
import { Char } from './Valores/Char';
import { Entero } from './Valores/Entero';
import { Boolean } from './Valores/Boolean';
import { Id } from './Valores/Id';
export class ContenidoImagenes {
    private static instance: ContenidoImagenes;
    lista: String[];
    grafica: string = "";
    _contador: number = 0;

    private constructor() {
        this.lista = [];
    }

    public static getInstance(): ContenidoImagenes {
        if (!ContenidoImagenes.instance) {
            ContenidoImagenes.instance = new ContenidoImagenes();
        }
        return ContenidoImagenes.instance;
    }

    public pushImgTs(e: Entorno) {
        this.lista.push(this.getDotTs(e));
    }

    private getDotTs(e: Entorno): string {
        this.grafica = 'digraph structs {node [shape=record]; struct3 [label="{{Variable|Descripcion}';
        if (e != null) {
            this.generacionDotTs(e);
        }
        this.grafica += '}"];}';
        return this.grafica;
    }

    private generacionDotTs(e: Entorno) {
        for (let [key, value] of e.variables) {
            let valor = "null"
            let linea = "--"
            if (!(value.valor == null)) {
                let ins = value.valor.ejecutar(e);
                if (ins instanceof Cadena || ins instanceof Char) {
                    valor = ins.valor;
                    linea = ins._linea;
                } else if (ins instanceof Entero || ins instanceof Decimal) {
                    valor = ins.valor_1.toString();
                    linea = ins._linea;
                } else if (ins instanceof Boolean) {
                    valor = ins.valorString();
                    linea = ins._linea;
                } else if (ins instanceof Id) {
                    valor = ins.id;
                    linea = ins._linea;
                }
            }
            this.grafica += `|{${value.id}| Valor: ${valor}, Linea: ${linea}, Tipo: ${value.getTipo()}}`
        }
    }

    public push(linea: string): void {
        this.lista.push(linea);
    }

    public pushImgExp(nodo: NodoAST) {
        this.lista.push(this.getDot(this.reordenarArbol(nodo)));
        this.grafica = "";
        this._contador = 0;
    }

    public pushFunAST(nodo: NodoAST) {
        this.lista.push(this.getDotFunAST(this.recorrerAST(nodo)));
    }

    public clear(): void {
        this.lista = [];
    }

    private getDotFunAST(raiz: NodoAST): string {
        this.grafica = 'digraph{rankdir=LR; ';
        if (raiz != null) {
            this.generacionDotAST(raiz);
        }
        this.grafica += '}';
        return this.grafica;
    }

    private generacionDotAST(nodo: NodoAST): void {
        let idPadre = this._contador;
        let label: string = this.formatear(nodo.valor);
        this.grafica += `node${idPadre}[shape=record, label="${label}"];`
        nodo.hijos.forEach((nodoHijo: NodoAST) => {
            let idHijo = ++this._contador;
            this.grafica += `node${idPadre} -> node${idHijo};`;
            this.generacionDotAST(nodoHijo);
        });
    }

    private getDot(raiz: NodoAST): string {
        this.grafica = 'digraph{node [style=rounded] ';
        if (raiz != null) {
            this.generacionDot(raiz);
        }
        this.grafica += '}';
        return this.grafica;
    }

    private generacionDot(nodo: NodoAST): void {
        let idPadre = this._contador;
        let label: string = nodo.tipo + ' | ' + this.formatearForEXP(nodo.valor);
        this.grafica += `node${idPadre}[shape=record, label="${label}"];`
        nodo.hijos.forEach((nodoHijo: NodoAST) => {
            let idHijo = ++this._contador;
            this.grafica += `node${idPadre} -> node${idHijo};`;
            this.generacionDot(nodoHijo);
        });
    }

    private formatearForEXP(valor: string): string {
        if (valor.startsWith("\"") || valor.startsWith("'") || valor.startsWith("`")) {
            return valor.substr(1, valor.length - 2);
        }

        if (valor == ">") {
            return "›"
        }

        if (valor == "<") {
            return "‹"
        }
        if (valor == "<=") {
            return "≤"
        }
        if (valor == ">=") {
            return "≥";
        }
        return valor;
    }

    private formatear(valor: string): string {
        if (valor.startsWith("\"") || valor.startsWith("'") || valor.startsWith("`")) {
            return valor.substr(1, valor.length - 2);
        }
        return valor;
    }

    private recorrerAST(nodo: NodoAST): any {

        if (nodo.valor == "DECLARACION_FUN") {
            if (nodo.hijos.length == 5) {
                let tipo = nodo.hijos[0].hijos[0].valor;
                let id = nodo.hijos[1].valor;
                return new NodoAST(`${tipo}: ${id}()`, "", "--");
            } else if (nodo.hijos.length == 6) {
                if (nodo.hijos[5].valor == "INSTRUCCIONES") {
                    let tipo = nodo.hijos[0].hijos[0].valor;
                    let id = nodo.hijos[1].valor;
                    let n = new NodoAST(`${tipo}: ${id}()`, "", "--");
                    //Agregar lista de instrucciones como hijos
                    let instrs: any[] = this.recorrerAST(nodo.hijos[5])
                    for (let ins of instrs) {
                        n.agregarHijo(ins);
                    }
                    return n;
                } else {
                    let tipo = nodo.hijos[0].hijos[0].valor;
                    let id = nodo.hijos[1].valor;
                    let parametros: any[] = this.recorrerAST(nodo.hijos[3]);
                    let parametrosString = ""
                    for (let i = 0; i < parametros.length; i++) {
                        parametrosString += parametros[i];
                        if (i < parametros.length - 1) {
                            parametrosString += ",";
                        }
                    }
                    return new NodoAST(`${tipo}: ${id}(${parametrosString})`, "", "--");
                }
            } else if (nodo.hijos.length == 7) {
                let tipo = nodo.hijos[0].hijos[0].valor;
                let id = nodo.hijos[1].valor;
                let parametros: any[] = this.recorrerAST(nodo.hijos[3]);
                let parametrosString = ""
                for (let i = 0; i < parametros.length; i++) {
                    parametrosString += parametros[i];
                    if (i < parametros.length - 1) {
                        parametrosString += ",";
                    }
                }
                let n = new NodoAST(`${tipo}: ${id}(${parametrosString})`, "", "--");

                let instrs: NodoAST[] = this.recorrerAST(nodo.hijos[6])
                for (let ins of instrs) {
                    n.agregarHijo(ins);
                }
                //Agregar lista de instrucciones como hijos
                return n;
            }
        }

        if (nodo.valor == "INSTRUCCIONES") {
            let instrs: NodoAST[] = []
            for (let ins of nodo.hijos) {
                instrs.push(this.recorrerAST(ins));
            }
            return instrs;
        }

        if (nodo.valor == "INSTRUCCION") {
            return this.recorrerAST(nodo.hijos[0])
        }

        if (nodo.valor == "PARA") {
            let n = new NodoAST("Para", "", "--");
            n.agregarHijo(new NodoAST("Iterador", "", "--"))
            n.agregarHijo(new NodoAST("Expresion", "", "--"));

            if (nodo.hijos.length >= 12) {
                let op = nodo.hijos[9].hijos[0].valor;
                let cad = op == "++" ? "Incremento" : "Decremento"
                n.agregarHijo(new NodoAST(cad, "", "--"))
            } else { //para par_a ASIGNACION pyc EXP pyc OP par_c dos_p
                let op = nodo.hijos[6].hijos[0].valor;
                let cad = op == "++" ? "Incremento" : "Decremento"
                n.agregarHijo(new NodoAST(cad, "", "--"))
            }


            if (nodo.hijos.length == 13 || nodo.hijos.length == 10) {
                let cuerpo = new NodoAST("Cuerpo", "", "--");
                let instrucciones: NodoAST[] = this.recorrerAST(nodo.hijos[nodo.hijos.length - 1]);
                for (let ins of instrucciones) {
                    cuerpo.agregarHijo(ins);
                }
                n.agregarHijo(cuerpo)
            }
            return n;
        }

        if (nodo.valor == "MIENTRAS") {
            let n = new NodoAST("Mientras", "", "--");
            n.agregarHijo(new NodoAST("Expresion", "", "--"));
            if (nodo.hijos.length == 6) {
                let cuerpo = new NodoAST("Cuerpo", "", "--");
                let instrs: NodoAST[] = this.recorrerAST(nodo.hijos[5]);
                for (let ins of instrs) {
                    cuerpo.agregarHijo(ins);
                }
                n.agregarHijo(cuerpo)
            }
            return n;
        }

        if (nodo.valor == "INSTRUCCION_SI") {
            switch (nodo.hijos.length) {
                case 1: {
                    //SI
                    const si = this.recorrerAST(nodo.hijos[0]);
                    let n = new NodoAST(`Instruccion Si`, "", "--");
                    n.agregarHijo(si);
                    return n
                }
                case 2: {
                    //SI SINO
                    const si = this.recorrerAST(nodo.hijos[0]);
                    const sino = this.recorrerAST(nodo.hijos[1]);
                    let n = new NodoAST(`Instruccion Si`, "", "--")
                    n.agregarHijo(si);
                    n.agregarHijo(sino);
                    return n
                }
            }
        }

        if (nodo.valor == "SI") {
            let n = new NodoAST(`Si`, "", "--");
            n.agregarHijo(new NodoAST("Expresion", "", "--"));
            if (nodo.hijos.length == 6) {
                let cuerpo = new NodoAST("Cuerpo", "", "--");
                let instrs: NodoAST[] = this.recorrerAST(nodo.hijos[5]);
                for (let ins of instrs) {
                    cuerpo.agregarHijo(ins);
                }
                n.agregarHijo(cuerpo)
            }
            return n
        }

        if (nodo.valor == "SINO") {
            let n = new NodoAST(`Sino`, "", "--");
            if (nodo.hijos.length == 3) {
                let cuerpo = new NodoAST("Cuerpo", "", "--");
                let instrs: NodoAST[] = this.recorrerAST(nodo.hijos[2]);
                for (let ins of instrs) {
                    cuerpo.agregarHijo(ins);
                }
                n.agregarHijo(cuerpo)
            }
            return n
        }

        if (nodo.valor == "DECLARACION_VAR") {
            //TIPO_VARIABLE_NATIVA id
            let n = new NodoAST(`Declaracion`, " ", "--");
            const tipo = this.recorrerAST(nodo.hijos[0]);
            let ids = "ID"
            n.agregarHijo(new NodoAST(`${tipo}`, "", "--"))
            switch (nodo.hijos.length) {
                case 4: //TIPO_VARIABLE_NATIVA id asig EXP
                    n.agregarHijo(new NodoAST(`${ids}`, "", "--"))
                    n.agregarHijo(new NodoAST(`Expresion`, "", "--"))
                    return n
                case 6: //TIPO_VARIABLE_NATIVA id coma IDS asig EXP
                    ids = "Lista IDs"
                    n.agregarHijo(new NodoAST(`${ids}`, "", "--"))
                    n.agregarHijo(new NodoAST(`Expresion`, "", "--"))
                    return n
            }
            n.agregarHijo(new NodoAST(`${ids}`, "", "--"))
            return n
        }

        if (nodo.valor == "LISTA_PARAMETROS") {
            let parametros: string[] = [];
            switch (nodo.hijos.length) {
                case 1:
                    //PARAMETRO
                    parametros.push(this.recorrerAST(nodo.hijos[0]));
                    return parametros;
                case 3:
                    //LISTA_PARAMETROS coma PARAMETRO
                    parametros = parametros.concat(this.recorrerAST(nodo.hijos[0]));
                    parametros.push(this.recorrerAST(nodo.hijos[2]));
                    return parametros;
            }
        }

        if (nodo.valor == "LISTA_EXPRESIONES") {
            switch (nodo.hijos.length) {
                case 1:
                    return new NodoAST("Expresion", "", "--");
                case 3:
                    return new NodoAST("Lista Expresiones", "", "--");
            }
        }

        if (nodo.valor == "LLAMADA_FUNCION") {
            let n = new NodoAST("LLamada a funcion", "", "--");
            if (nodo.hijos.length == 4) {
                n.agregarHijo(this.recorrerAST(nodo.hijos[2]))
                return n;
            }
            return n;
        }

        if (nodo.valor == "MOSTRAR") {
            let n = new NodoAST("Mostrar", "", "--");
            n.agregarHijo(this.recorrerAST(nodo.hijos[2]))
            return n
        }

        if (nodo.valor == "RETORNO") {
            let n = new NodoAST(`Retorno`, "", "--")
            switch (nodo.hijos.length) {
                case 1:
                    return n;
                case 2:
                    n.agregarHijo(new NodoAST(`Expresion`, "", "--"))
                    return n;
            }
        }

        if (nodo.valor == "CONTINUAR") {
            return new NodoAST(`Continuar`, "", "--")
        }

        if (nodo.valor == "DETENER") {
            return new NodoAST(`Detener`, "", "--")
        }

        if (nodo.valor == "PARAMETRO") {
            const tipo = this.recorrerAST(nodo.hijos[0]);
            return `${tipo}`;
        }

        if (nodo.valor == "ASIGNACION") {
            let n = new NodoAST(`Asignacion`, "", "--")
            n.agregarHijo(new NodoAST("ID", "", "--"))
            n.agregarHijo(new NodoAST("Expresion", "", "--"))
            return n;
        }

        if (nodo.valor == "TIPO_VARIABLE_NATIVA") {
            switch (nodo.hijos[0].tipo) {
                case "double":
                    return "Double";
                case "boolean":
                    return "Boolean";
                case "string":
                    return "String";
                case "int":
                    return "Int";
                case "char":
                    return "Char";
                case "void":
                    return "Void";
            }
        }

        if (nodo.valor == "DIBUJAR_AST") {
            let n = new NodoAST("DibujarAST", "", "--");
            n.agregarHijo(new NodoAST("ID", "", "--"));
            return n
        }

        if (nodo.valor == "DIBUJAR_EXP") {
            let n = new NodoAST("DibujarEXP", "", "--");
            n.agregarHijo(new NodoAST("Expresion", "", "--"))
            return n
        }

        if (nodo.valor == "DIBUJAR_TS") {
            return new NodoAST("DibujarTS", "", "--");
        }

        return new NodoAST("Error", "", "--")
    }

    private reordenarArbol(nodo: NodoAST): NodoAST {
        let padre: NodoAST;
        let hijoIz: NodoAST;
        let hijoDer: NodoAST;
        if (nodo.valor == "EXP" && nodo.hijos.length == 3) {
            hijoIz = this.reordenarArbol(nodo.hijos[0]);
            padre = nodo.hijos[1];
            hijoDer = this.reordenarArbol(nodo.hijos[2]);
            padre.agregarHijo(hijoIz);
            padre.agregarHijo(hijoDer);
            return padre;
        }
        if (nodo.valor == "EXP" && nodo.hijos.length == 1) {
            return this.reordenarArbol(nodo.hijos[0]);
        }
        return nodo;
    }
}
