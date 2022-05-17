import { NodoAST } from '../arbol/NodoAST';
import { Entorno } from './Entorno';
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
        this.grafica = 'digraph structs {node [shape=record]; struct3 [label="{{Nombre|Descripcion}';
        if (e != null) {
            this.generacionDotTs(e);
        }
        this.grafica += '}"];}';
        return this.grafica;
    }

    private generacionDotTs(e: Entorno) {
        for (let [key, value] of e.variables) {
            this.grafica += `|{Variable ${value.id}|Tipo: ${value.getTipo()}}`
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
        this.lista.push(this.getDotFunAST(nodo));
    }

    public clear(): void {
        this.lista = [];
    }

    private getDotFunAST(raiz: NodoAST): string {
        this.grafica = 'digraph{ rankdir=LR ';
        if (raiz != null) {
            this.generacionDotAST(raiz);
        }
        this.grafica += '}';
        return this.grafica;
    }

    private generacionDotAST(nodo: NodoAST): void {
        let idPadre = this._contador;
        let label: string = this.formatear(nodo.valor);
        this.grafica += `node${idPadre}[label="${label}"];`
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
