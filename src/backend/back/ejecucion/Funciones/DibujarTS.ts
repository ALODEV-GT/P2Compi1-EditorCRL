import { Entorno } from '../Entorno';
import { Instruccion } from '../Instruccion';
import { ContenidoImagenes } from '../ContenidoImagenes';
export class DibujarTS extends Instruccion {

    constructor(linea: string) {
        super(linea);
    }

    ejecutar(e: Entorno) {
        ContenidoImagenes.getInstance().pushImgTs(e);
        return
    }
}