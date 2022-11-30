import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowTrainingPage } from './show-training.page';

const routes: Routes = [
  {
    path: '',
    component: ShowTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowTrainingPageRoutingModule {}
