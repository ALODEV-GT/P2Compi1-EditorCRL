import { Component, OnInit, Input } from '@angular/core';
import { graphviz } from 'd3-graphviz';
@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  @Input() contenidGraph: string = "a->b";

  constructor() { }

  ngOnInit(): void {

  }

  prueba(): void{
    graphviz('#grafico').renderDot(this.contenidGraph);
  }

}
