import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';
import { ReporteErroresComponent } from './reporte-errores/reporte-errores.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { EjecucionComponent } from './ejecucion/ejecucion.component';



@NgModule({
  declarations: [
    TerminalComponent,
    ReporteErroresComponent,
    ImagenesComponent,
    EjecucionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EjecucionComponent
  ]
})
export class EjecucionModule { }
