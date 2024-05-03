import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Preferences } from '@capacitor/preferences';
import { DeleteAllConfirmComponent } from 'src/app/shared/components/delete-all-confirm/delete-all-confirm.component';

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
  async ngOnInit(): Promise<void> {
    //Preferences.clear();
    await SplashScreen.show({
      showDuration: 1000,
      autoHide: true,
    });
    this.getCategories();
  }

  async ionViewDidEnter(): Promise<void> {
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.categoryService.getAllCategories() || [];
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
      this.addNewCategory(data);
    }
  }

  async openDeleteAllModal() {
    const modal = await this.modal.create({
      component: DeleteAllConfirmComponent,
    });
    await modal.present();

    const {role} = await modal.onWillDismiss();

    if(role === 'completed') {
      Preferences.clear();
      this.categoryService.saveCategories(this.categories);
    }
  }

}
