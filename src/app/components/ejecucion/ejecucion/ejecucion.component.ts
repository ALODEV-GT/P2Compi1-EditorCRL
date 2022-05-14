import { Component, OnInit, Input } from '@angular/core';
import { Consola } from 'src/backend/front/Consola';
import { ManejadorEjecucion } from '../../../../backend/front/ManejadorEjecucion';

@Component({
  selector: 'app-ejecucion',
  templateUrl: './ejecucion.component.html',
  styleUrls: ['./ejecucion.component.css']
})
export class EjecucionComponent implements OnInit {

  constructor() { }

  @Input() ventanaActiva!: ManejadorEjecucion;
  @Input() lista!: any[];
  TERMINAL: number = 1;
  ERRORES: number = 2;
  IMAGENES: number = 3;

  ngOnInit(): void {
    
  }

}
