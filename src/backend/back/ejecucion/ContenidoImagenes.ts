import { NodoAST } from '../arbol/NodoAST';
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

    public push(linea: string): void {
        this.lista.push(linea);
    }

    public pushImgExp(nodo: NodoAST) {
        this.lista.push(this.getDot(this.reordenarArbol(nodo)));
        this.grafica = "";
        this._contador = 0;
    }

    public clear(): void {
        this.lista = [];
    }

    getDot(raiz: NodoAST): string {
        this.grafica = 'digraph{node [style=rounded] ';
        if (raiz != null) {
            this.generacionDot(raiz);
        }
        this.grafica += '}';
        return this.grafica;
    }

    private generacionDot(nodo: NodoAST): void {
        let idPadre = this._contador;
        let label: string = nodo.tipo + '|' + this.formatear(nodo.valor);
        this.grafica += `node${idPadre}[shape=record, label="${label}"];`
        nodo.hijos.forEach((nodoHijo: NodoAST) => {
            let idHijo = ++this._contador;
            this.grafica += `node${idPadre} -> node${idHijo};`;
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
