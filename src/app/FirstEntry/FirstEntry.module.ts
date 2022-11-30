import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirstEntryPage } from './FirstEntry.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FirstEntryPageRoutingModule } from './FirstEntry-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FirstEntryPageRoutingModule
  ],
  declarations: [FirstEntryPage]
})
export class FirstEntryPageModule {}
