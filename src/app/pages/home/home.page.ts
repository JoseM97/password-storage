import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Site } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  categories: Category[];
  sites: Site[];

  constructor(
    private modal: ModalController,
  ) {
    this.categories = [];
    this.sites = [];
  }
  ngOnInit(): void {
    this.categories.push(
      new Category('#252525', 'Albaranes'));
    this.categories.push(
      new Category('#252525', 'Facturas'));
    this.categories.push(
      new Category('#252525', 'Presupuestos'));

    this.sites.push(
      new Site('Albaranes', '@YO', '123132'));
    this.sites.push(
      new Site('Facturas', '@TU', '1231321asd'));
    this.sites.push(
      new Site('Presupuestos', '@JM', 'sadas654dfg3dasdf_dsda'));
  }

  async getCategory() {
    const { value } = await Preferences.get({ key: 'categories' });
    if(value != null) {
      console.log(JSON.parse(value));
    }
  }

  async setCategory() {
    this.categories[0].setSites(this.sites);
    await Preferences.set({
        key: 'categories',
        value: JSON.stringify(this.categories),
      });
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
