import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowDietPageRoutingModule } from './show-diet-routing.module';

import { ShowDietPage } from './show-diet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowDietPageRoutingModule
  ],
  declarations: [ShowDietPage]
})
export class ShowDietPageModule {}
