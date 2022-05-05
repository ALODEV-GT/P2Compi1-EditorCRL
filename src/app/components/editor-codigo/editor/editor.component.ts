import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Proyecto } from 'src/backend/front/Proyecto';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {

  @Input() proyecto!: Proyecto;

  content: any;
  constructor() {
    
  }

  ngOnInit(): void {
    this.content = this.proyecto.contenido || "";
  }



}
