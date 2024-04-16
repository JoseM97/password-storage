import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoryPage } from './category.page';

import { CategoryPageRoutingModule } from './category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    SharedModule
  ],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
