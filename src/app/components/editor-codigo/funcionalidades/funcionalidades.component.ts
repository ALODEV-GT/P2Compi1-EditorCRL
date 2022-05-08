import { Component, Input, OnInit } from '@angular/core';
import { ContadorVentanas } from 'src/backend/front/ContadorVentanas';
import { ManejadorEjecucion } from 'src/backend/front/ManejadorEjecucion';
import { Proyecto } from 'src/backend/front/Proyecto';
import { NodoAST } from '../../../../backend/back/arbol/NodoAST';
import { RecorrerArbol } from '../../../../backend/back/arbol/RecorrerArbol';
import { Lista } from '../../../../backend/back/ListaEnlazada/Lista';
import { Agrupador } from '../../../../backend/back/ListaEnlazada/Agrupador';
declare var require: any;
const myParser = require("./../../../../backend/back/analizador/grammar.js");
let recorrer: RecorrerArbol = new RecorrerArbol();
let listaInstrucciones: Lista = new Lista();
let agrupador: Agrupador = new Agrupador();
myParser.Parser.yy={Nodo:NodoAST, Rec:recorrer, LisIn: listaInstrucciones, Agrup: agrupador};

@Component({
  selector: 'app-funcionalidades',
  templateUrl: './funcionalidades.component.html',
  styleUrls: ['./funcionalidades.component.css']
})
export class FuncionalidadesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() proyecto!: Proyecto;
  @Input() proyectos!: Proyecto[];
  @Input() numVentana!: number;
  @Input() contadorVentanas!: ContadorVentanas;

  ventanaActiva: ManejadorEjecucion = new ManejadorEjecucion();

  agregarVentana() {
    this.proyectos.push(new Proyecto("", this.contadorVentanas.contador));
    this.contadorVentanas.incrementar();
  }

  cerrar() {
    this.proyectos.splice(this.numVentana, 1);
  }

  fileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      let archivo: File = <File>event.target.files[0];
      let nombreArchivo: String = archivo.name;
      //image preview
      const reader = new FileReader();
      reader.onload = e => console.log(e.target!.result);
    }
  }

  archivo: any;
  basicUploadSingle(event: any) {
    this.archivo = event.target.files[0];
    this.leerArchivo();
  }

  leerArchivo() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }

    //Este contiene el contenido.
    fileReader.readAsText(this.archivo);
    this.proyecto.contenido = "fileReader.result?.toString() || ";
    console.log("Cabio de contenido")
  }

  activarConsola() {
    this.ventanaActiva.ventanaActiva = 1;
  }

  activarErrores() {
    this.ventanaActiva.ventanaActiva = 2;
  }

  activarImagenes() {
    this.ventanaActiva.ventanaActiva = 3;
  }

  ejecutar() {
    try {
      let raiz: NodoAST = myParser.parse(this.proyecto.contenido);
      console.log(raiz);
      console.log('analizado');
    } catch (error) {
      console.log('Ocurrio un error');
    }
  }
}
