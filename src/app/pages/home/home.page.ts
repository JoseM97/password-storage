import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { Site } from 'src/app/core/models/site.model';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  categories: Category[];

  constructor(private modal: ModalController) {
    this.categories = []
  }
  ngOnInit(): void {
    this.categories.push(
      new Category('#252525', 'Series'));
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

  addNewCategory(category: Category) {
    console.log(category);
  }

}
