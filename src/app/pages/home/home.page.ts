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
    //Preferences.clear();
    this.getCategories();
  }

  async getCategories() {
    (await Preferences.keys()).keys.forEach(async element => {
      // We get data from keys
      const category = await Preferences.get({ key: element });
      // Then we saved that data on aux parsing it
      const aux = JSON.parse(category.value || '{}');
      // Create foreach key a new categry Object
      const categoryAux = new Category(aux['color'], aux['title']);
      // Setting sites from this category
      categoryAux.setSites(aux['sites']);
      // Push the new category to array list
      this.categories.push(categoryAux);
      console.log(aux['title']);
    });
  }

  async setCategory(key: string, color: string, sites: Site[]) {
    await Preferences.set({
      key: key,
      value: JSON.stringify({
        title: key,
        color: color,
        sites: sites
      })
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
    this.setCategory(category.getTitle(), category.getColor(), category.getSites());
  }

}
