import { Entorno } from "./Entorno";

export abstract class Instruccion {
  _linea: string = "";
  abstract ejecutar(e: Entorno): any;

  constructor(linea: string) {
    this._linea = linea + 1;
  }

  getLinea(): string {
    return this._linea;
  }
}
