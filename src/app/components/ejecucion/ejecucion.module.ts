import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';
import { ReporteErroresComponent } from './reporte-errores/reporte-errores.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { EjecucionComponent } from './ejecucion/ejecucion.component';
import { MaterialModule } from '../../material/material.module';
import { ImagenComponent } from './imagen/imagen.component';



@NgModule({
  declarations: [
    TerminalComponent,
    ReporteErroresComponent,
    ImagenesComponent,
    EjecucionComponent,
    ImagenComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    EjecucionComponent
  ]
})
export class EjecucionModule { }
