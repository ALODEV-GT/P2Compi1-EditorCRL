import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalComponent
  },
  {
    path: '404', //Pagina de error
    component: ErrorPageComponent //Componente relacionado con el path.
  },
  {
    path: '**', //Cualquier otra pagina que no existe.
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
