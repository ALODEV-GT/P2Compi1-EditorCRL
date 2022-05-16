import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { Errores } from '../Errores/Errores';
import { Error } from '../Errores/Error';
import { Cadena } from '../Valores/Cadena';
import { Decimal } from '../Valores/Decimal';
import { Boolean } from '../Valores/Boolean';
import { Entero } from '../Valores/Entero';
import { Char } from '../Valores/Char';
import { TiposNativos } from './TiposNativo';
export class Asignacion extends Instruccion {
    private _id: string
    private _exp: Instruccion

    constructor(id: string, exp: Instruccion, linea: string) {
        super(linea);
        this._id = id;
        this._exp = exp;
    }

    ejecutar(e: Entorno) {
        //Busqueda de id
        const variable = e.getVariable(this._id);
        if (!variable) {
            Errores.getInstance().push(new Error('semantico', this._linea, `La variable ${this._id} no esta declarada`));
            return;
        }

        let valor = this._exp.ejecutar(e);
        let id = valor.id;
        //CASTEOS
        if (variable.tipo == TiposNativos.STRING) {
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
        } else if (variable.tipo == TiposNativos.DOUBLE) {
            if (valor instanceof Cadena) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un String a la variable Double.`));
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
        } else if (variable.tipo == TiposNativos.BOOLEAN) {
            if (valor instanceof Cadena) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un String a la variable Boolean.`));
                return
            } else if (valor instanceof Decimal) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Double a la variable Boolean.`));
                return
            } else if (valor instanceof Boolean) {
                //Sin acciones
            } else if (valor instanceof Entero) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Int a la variable Boolean.`));
                return
            } else if (valor instanceof Char) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Char a la variable Boolean.`));
                return
            }
        } else if (variable.tipo == TiposNativos.INT) {
            if (valor instanceof Cadena) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un String a la variable Int.`));
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
        } else if (variable.tipo == TiposNativos.CHAR) {
            if (valor instanceof Cadena) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un String a la variable Char.`));
                return
            } else if (valor instanceof Decimal) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Double a la variable Char.`));
                return
            } else if (valor instanceof Boolean) {
                Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un Boolean a la variable Char.`));
                return
            } else if (valor instanceof Entero) {
                let conv = String.fromCharCode(valor.valor_1);
                valor = new Char(conv, this._linea);
            } else if (valor instanceof Char) {
                //sin accion
            }
        } else {
            Errores.getInstance().push(new Error('semantico', this._linea, `No se puede asignar un tipo diferente a la variable.`));
            return;
        }

        variable.valor = valor;
        console.log("Reasignacion realizada");
    }
}