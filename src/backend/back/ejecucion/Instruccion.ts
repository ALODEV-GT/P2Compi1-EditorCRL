import { Entorno } from "./Entorno";

export abstract class Instruccion{
  _linea: string = "";
  abstract ejecutar(e : Entorno) : any;

  constructor(linea: string){
    const valor = +linea + 1;
    Object.assign(this, {linea: valor.toString()});
  }

  getLinea() : string{
    return this._linea;
  }
}
