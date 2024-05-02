import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { Site } from 'src/app/core/models/site.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { AddSiteComponent } from 'src/app/shared/components/add-site/add-site.component';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
})
export class CategoryPage{
  sites: Site[] = [];
  category!: Category;
  categories!: Category[];
 
  constructor(private modal: ModalController, private categoryService: CategoryService) {
    this.category = new Category(
      history.state.category['color'],
      history.state.category['title']
    );

    this.category.setSites(history.state.category['sites']);

    //console.log(this.category.getColor());

    //this.sites = categoryService.getSites(this.category);

    //console.log(this.sites);
  }

  async openAddSiteModal() {
    const modal = await this.modal.create({
      component: AddSiteComponent,
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(role === 'completed') {
      console.log('site');
      this.addNewSite(data);
    }
  }

  async addNewSite(site: Site) {
    this.sites = this.category.getSites();
    this.sites.push(site);
    //this.category.setSites(this.sites);
    this.categories = await this.categoryService.getAllCategories() || [];
    console.log('Categorias: '+this.categories);
    this.categories.forEach(category => {
      category['sites'] = this.sites;
      console.log('Solo una: '+category);
    });
  }

}
