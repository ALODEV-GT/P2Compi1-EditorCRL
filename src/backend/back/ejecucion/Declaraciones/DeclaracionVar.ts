import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { TiposNativos } from './TiposNativo';
import { EntornoAux } from '../EntornoAux';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
import { Variable } from './Variable';
import { Cadena } from '../Valores/Cadena';
import { Decimal } from '../Valores/Decimal';
import { Boolean } from '../Valores/Boolean';
import { Entero } from '../Valores/Entero';
import { Char } from '../Valores/Char';
export class DeclaracionVar extends Instruccion {
    private _tipo: TiposNativos;
    private _ids: string[];
    private _exp: Instruccion | null;

    constructor(tipo: TiposNativos, ids: string[], exp: Instruccion | null, linea: string) {
        super(linea);
        this._tipo = tipo;
        this._ids = ids;
        this._exp = exp;
    }
    ejecutar(e: Entorno) {
        //Busqueda de existencia
        for (let id of this._ids) {
            let variable = e.getVariable(id);
            if (variable && !EntornoAux.getInstance().estoyEjecutandoFuncion()) {
                Errores.getInstance().push(new Error('semantico', this._linea, `Ya existe una variable con el nombre ${id} declarada en este entorno`));
                return;
            }

            let valor = this._exp?.ejecutar(e);
            console.log("Valor: " + valor);

            //Validar si se declara una variable de tipo VOID
            if (this._tipo == TiposNativos.VOID) {
                Errores.getInstance().push(new Error('semantico', this._linea, `Void no es un tipo para una variable`));
                return;
            }

            if (valor != null) {
                //CASTEOS
                if (this._tipo == TiposNativos.STRING) {
                    if (valor instanceof Cadena) {
                        //sin acciones
                    } else if (valor instanceof Decimal) {
                        valor = new Cadena(valor.valor_1.toString(), this._linea);
                    } else if (valor instanceof Boolean) {
                        valor = new Cadena(valor.valorNumerico().toString(), this._linea);
                    } else if (valor instanceof Entero) {
                        valor = new Cadena(valor.valor_1.toString(), this._linea);
                    } else if (valor instanceof Char) {
                        valor = new Cadena(valor.valor, this._linea);
                    }
                } else if (this._tipo == TiposNativos.DOUBLE) {
                    if (valor instanceof Cadena) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un String a la variable Double ${id}`));
                        return
                    } else if (valor instanceof Decimal) {
                        //Sin acciones
                    } else if (valor instanceof Boolean) {
                        valor = new Decimal(valor.valorNumerico(), this._linea);
                    } else if (valor instanceof Entero) {
                        valor = new Decimal(valor.valor_1, this._linea);
                    } else if (valor instanceof Char) {
                        valor = new Decimal(valor.valorNumerico(), this._linea)
                    }
                } else if (this._tipo == TiposNativos.BOOLEAN) {
                    if (valor instanceof Cadena) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un String a la variable Boolean ${id}`));
                        return
                    } else if (valor instanceof Decimal) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Double a la variable Boolean ${id}`));
                        return
                    } else if (valor instanceof Boolean) {
                        //Sin acciones
                    } else if (valor instanceof Entero) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Int a la variable Boolean ${id}`));
                        return
                    } else if (valor instanceof Char) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Char a la variable Boolean ${id}`));
                        return
                    }
                } else if (this._tipo == TiposNativos.INT) {
                    if (valor instanceof Cadena) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un String a la variable Int ${id}`));
                        return
                    } else if (valor instanceof Decimal) {
                        let conv = ~~(valor.valor_1);
                        valor = new Entero(conv, this._linea);
                    } else if (valor instanceof Boolean) {
                        valor = new Entero(valor.valorNumerico(), this._linea);
                    } else if (valor instanceof Entero) {
                        //sin accion
                    } else if (valor instanceof Char) {
                        valor = new Entero(valor.valorNumerico(), this._linea);
                    }
                } else if (this._tipo == TiposNativos.CHAR) {
                    if (valor instanceof Cadena) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un String a la variable Char ${id}`));
                        return
                    } else if (valor instanceof Decimal) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Double a la variable Char ${id}`));
                        return
                    } else if (valor instanceof Boolean) {
                        Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Boolean a la variable Char ${id}`));
                        return
                    } else if (valor instanceof Entero) {
                        let conv = String.fromCharCode(valor.valor_1);
                        valor = new Char(conv, this._linea);
                    } else if (valor instanceof Char) {
                        //sin accion
                    }
                } else {
                    Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un tipo diferente a la variable ${id}`));
                    return;
                }
            }

            if (valor != null) {
                variable = new Variable(id, this._tipo, valor);
                e.setVariable(variable);
                console.log(`variable ${id} declarada`);
            } else {
                variable = new Variable(id, this._tipo);
                e.setVariable(variable);
                console.log(`variable ${id} declarada`);
            }


        }
    }
}