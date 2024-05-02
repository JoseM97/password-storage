import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  categories: Category[];
  category!: Category;

  constructor(
    private modal: ModalController,
    private categoryService: CategoryService
  ) {
    this.categories = [];
  }
  ngOnInit(): void {
    //Preferences.clear();
    this.getCategories();
    //console.log(Preferences.keys());
  }

  ionViewDidEnter(): void {
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.categoryService.getAllCategories() || [];
    console.log(this.categories);
  }

  addNewCategory(category: Category) {
    if (category) {
      this.categories.push(category);
      this.categoryService.saveCategories(this.categories);
    } else {
      console.error('Intentando agregar una categoría no válida.');
    }
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

}
