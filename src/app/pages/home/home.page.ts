import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  categories: Category[];

  constructor(
    private modal: ModalController,
  ) {
    this.categories = []
  }
  ngOnInit(): void {
    this.categories.push(
      new Category('#252525', 'Albaranes'));
    this.categories.push(
      new Category('#252525', 'Facturas'));
    this.categories.push(
      new Category('#252525', 'Presupuestos'));
  }

  async openAddCategoryModal() {
    const modal = await this.modal.create({
      component: AddCategoryComponent,
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(role === 'completed') {
      console.log('category');
      this.addNewCategory(data);
    }
  }

  addNewCategory(category: Category) {
    this.categories.push(category);
  }

}
