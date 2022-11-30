import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowTrainingPageRoutingModule } from './show-training-routing.module';

import { ShowTrainingPage } from './show-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowTrainingPageRoutingModule
  ],
  declarations: [ShowTrainingPage]
})
export class ShowTrainingPageModule {}
