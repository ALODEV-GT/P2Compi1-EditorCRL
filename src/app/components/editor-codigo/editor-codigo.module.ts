import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FuncionalidadesComponent } from './funcionalidades/funcionalidades.component';
import { MaterialModule } from '../../material/material.module';
import { EditorCompletoComponent } from './editor-completo/editor-completo.component';
import { EjecucionModule } from '../ejecucion/ejecucion.module';


@NgModule({
  declarations: [
    EditorComponent,
    FuncionalidadesComponent,
    EditorCompletoComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    CodemirrorModule,
    MaterialModule,
    EjecucionModule
  ],
  exports: [
    EditorCompletoComponent
  ]
})
export class EditorCodigoModule { }
