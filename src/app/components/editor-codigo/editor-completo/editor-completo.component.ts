import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from '../../../../backend/front/Proyecto';
import { ContadorVentanas } from '../../../../backend/front/ContadorVentanas';

@Component({
  selector: 'app-editor-completo',
  templateUrl: './editor-completo.component.html',
  styleUrls: ['./editor-completo.component.css']
})
export class EditorCompletoComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  @Input() proyecto!: Proyecto;
  @Input() proyectos!: Proyecto[];
  @Input() numVentana!: number;
  @Input() contadorVentanas!: ContadorVentanas;

}
