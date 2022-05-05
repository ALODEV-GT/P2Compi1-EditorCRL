import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';





@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
