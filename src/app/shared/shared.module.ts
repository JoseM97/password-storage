import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddSiteComponent } from './components/add-site/add-site.component';
import { CategoryComponent } from './components/category/category.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteAllConfirmComponent } from './components/delete-all-confirm/delete-all-confirm.component';



@NgModule({
  exports: [AddCategoryComponent, AddSiteComponent, CategoryComponent, DeleteAllConfirmComponent],
  declarations: [AddCategoryComponent, AddSiteComponent, CategoryComponent, DeleteAllConfirmComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
