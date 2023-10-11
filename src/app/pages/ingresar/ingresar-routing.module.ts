import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarPage } from './ingresar.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
