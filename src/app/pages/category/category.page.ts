import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { Site } from 'src/app/core/models/site.model';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
})
export class CategoryPage implements OnInit{
  sites: Site[];
  category!: Category;
 
  constructor(private modal: ModalController) {
    this.sites = []
    this.category = new Category(
      history.state.category['color'],
      history.state.category['title']
    );
  }

  ngOnInit(): void {
    this.sites.push(
      new Site('Albaranes', '@YO', '123132'));
    this.sites.push(
      new Site('Facturas', '@TU', '1231321asd'));
    this.sites.push(
      new Site('Presupuestos', '@JM', 'sadas654dfg3dasdf_dsda'));
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

  addNewCategory(category: Site) {
    this.sites.push(category);
  }

}
