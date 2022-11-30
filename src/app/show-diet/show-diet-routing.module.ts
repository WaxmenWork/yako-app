import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowDietPage } from './show-diet.page';

const routes: Routes = [
  {
    path: '',
    component: ShowDietPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowDietPageRoutingModule {}
