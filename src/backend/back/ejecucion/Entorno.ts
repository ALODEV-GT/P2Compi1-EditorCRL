import { Funcion } from "./Declaraciones/Funcion";
import { Variable } from "./Declaraciones/Variable";

export class Entorno {
    private _variables: Map<String, Variable>;
    private _padre: Entorno | null;
    private _funciones: Map<String, Funcion>;

    constructor(padre?: Entorno) {
        this._padre = padre != null ? padre : null;
        this._variables = new Map();
        this._funciones = new Map();
    }

    setVariable(variable: Variable): void {
        this._variables.set(variable.id, variable);
    }

    getVariable(id: string): Variable | null {
        for (let e: Entorno | null = this; e != null; e = e.padre) {
            let variable = e._variables.get(id);
            if (variable != null) return variable;
        }
        return null;
    }

    hasVariable(id: string): boolean {
        for (let e: Entorno | null = this; e != null; e = e.padre) {
            if (e._variables.has(id)) {
                return true;
            }
        }
        return false;
    }

    updateValorVariable(id: string, valor: any) {
        let variable: Variable | null = this.getVariable(id);
        if (variable != null) {
            variable.valor = valor;
        }
    }

    setFuncion(funcion: Funcion) {
        this._funciones.set(funcion.id, funcion);
    }

    hasFuncion(id: string): boolean {
        for (let e: Entorno | null = this; e != null; e = e.padre) {
            if (e.funciones.has(id)) {
                return true;
            }
        }
        return false;
    }

    getFuncion(id: string): Funcion | null {
        for (let e: Entorno | null = this; e != null; e = e.padre) {
            if (e.funciones.has(id)) {
                return e.funciones.get(id)!;
            }
        }
        return null;
    }

    //Utilizado para saber si debo ir a una funcion a buscar la variable
    deboBuscarEnFunciones(id: string): boolean {
        const ids = id.split("_");
        if (ids.length < 3) return false;
        if (ids[0] != 'nv') return false;
        return true;
    }

    //Utilizado para obtener el id de la funcion en la cual debo ir a buscar
    getIdFuncionABuscar(id: string): string {
        const ids = id.split("_", 2);
        return ids[1] ?? '';
    }

    getEntornoGlobal(): Entorno | null {
        for (let e: Entorno | null = this; e != null; e = e.padre) {
            if (e.padre == null) return e;
        }
        return null
    }

    public toString(): string {
        let salida = `*** VARIABLES ****\n`;
        for (let variable of Array.from(this.variables.values())) {
            salida += variable.toString() + '\n';
        }
        return salida;
    }

    getVariables(): Array<Variable> {
        return Array.from(this.variables.values());
    }

    public get padre(): Entorno | null {
        return this._padre;
    }

    public get variables(): Map<String, Variable> {
        return this._variables;
    }
    public set variables(value: Map<String, Variable>) {
        this._variables = value;
    }

    public get funciones(): Map<String, Funcion> {
        return this._funciones;
    }
    public set funciones(value: Map<String, Funcion>) {
        this._funciones = value;
    }
    public set padre(value: Entorno | null) {
        this._padre = value;
    }
}