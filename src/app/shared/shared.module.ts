import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddSiteComponent } from './components/add-site/add-site.component';
import { CategoryComponent } from './components/category/category.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  exports: [AddCategoryComponent, AddSiteComponent, CategoryComponent],
  declarations: [AddCategoryComponent, AddSiteComponent, CategoryComponent],
  imports: [
    CommonModule, IonicModule
  ]
})
export class SharedModule { }
