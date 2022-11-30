import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowFoodPage } from './show-food.page';

const routes: Routes = [
  {
    path: '',
    component: ShowFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowFoodPageRoutingModule {}
