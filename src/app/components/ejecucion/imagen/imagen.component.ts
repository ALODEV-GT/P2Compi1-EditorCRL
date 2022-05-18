import { Component, OnInit, Input } from '@angular/core';
import html2canvas from "html2canvas";
import { graphviz } from 'd3-graphviz';
@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  @Input() contenidGraph: string = "digraph{ a -> b }";

  imgcreada = false;
  imagenCreada: any;
  imagenVista = false;
  constructor() { }

  ngOnInit(): void {

  }

  prueba(): void {
    graphviz('#grafico').renderDot(this.contenidGraph);
    this.imagenVista = true;
  }

  crearImagen() {
    html2canvas(document.querySelector("#grafico")!).then(canvas => {
      this.imagenCreada = canvas.toDataURL();
    });
    this.imgcreada = true;
  }

}
