import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../../backend/front/Proyecto';
import { ContadorVentanas } from '../../../backend/front/ContadorVentanas';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  constructor() { 

  }

  proyectos: Proyecto[] = [];
  contadorVentanas: ContadorVentanas = new ContadorVentanas();

  ngOnInit(): void {
  }

  nuevo(){
    this.proyectos.push(new Proyecto("", this.contadorVentanas.contador));
    this.contadorVentanas.incrementar();
  }

}
