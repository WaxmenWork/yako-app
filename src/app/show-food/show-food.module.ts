import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowFoodPageRoutingModule } from './show-food-routing.module';

import { ShowFoodPage } from './show-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowFoodPageRoutingModule
  ],
  declarations: [ShowFoodPage]
})
export class ShowFoodPageModule {}
