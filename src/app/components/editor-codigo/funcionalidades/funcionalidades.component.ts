import { Component, Input, OnInit } from '@angular/core';
import { ContadorVentanas } from 'src/backend/front/ContadorVentanas';
import { ManejadorEjecucion } from 'src/backend/front/ManejadorEjecucion';
import { Proyecto } from 'src/backend/front/Proyecto';
import { NodoAST } from '../../../../backend/back/arbol/NodoAST';
import { Lista } from '../../../../backend/back/ListaEnlazada/Lista';
import { Agrupador } from '../../../../backend/back/ListaEnlazada/Agrupador';
import { Ejecucion } from '../../../../backend/back/ejecucion/Ejecucion';
import { graphviz } from 'd3-graphviz';
import { Salida } from 'src/backend/back/ejecucion/Salida';
import { Errores } from 'src/backend/back/ejecucion/Errores/Errores';

declare var require: any;
const myParser = require("./../../../../backend/back/analizador/grammar.js");
let listaInstrucciones: Lista = new Lista();
let agrupador: Agrupador = new Agrupador();
myParser.Parser.yy = { Nodo: NodoAST, LisIn: listaInstrucciones, Agrup: agrupador };

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

  lista: any[] = [];
  listaErr: any[] = [];

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

  selectedFile: File | null = null
  texto: any;
  archivo: any;

  fileUploadInAngular(event: any) {
    const files = (event.target as HTMLInputElement).files;
    if (files != null) {
      this.selectedFile = files.item(0);
    }
    this.imprimir();
  }

  imprimir() {
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      const contenido = e.target?.result;
      this.proyecto.contenido = fileReader.result as string;
    }

    if (this.selectedFile != null) {
      fileReader.readAsText(this.selectedFile);
    } else {
      console.log("archivo nulo");
    }
  }

  descargar() {
    const a = document.createElement("a");
    const contenido = this.proyecto.contenido;
    const enlc = new Blob([contenido], { type: "text/crl" });
    const url = window.URL.createObjectURL(enlc);
    a.href = url;
    a.download = "Proyecto" + this.proyecto.idVentana + ".crl";
    a.click();
    URL.revokeObjectURL(url)
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
    Salida.getInstance().clear();
    Errores.getInstance().clear();
    try {
      let raiz: NodoAST = myParser.parse(this.proyecto.contenido);
      let ejecucion: Ejecucion = new Ejecucion(raiz);
      // let str3: string = ejecucion.getDot();
      // graphviz('div').renderDot(str3);
      ejecucion.ejecutar();
      console.log('analizado y ejecutado');
    } catch (error) {
      console.log('Ocurrio un error');
    }

    this.lista = Salida.getInstance().lista;
    this.listaErr = Errores.getInstance().lista;
  }


}
