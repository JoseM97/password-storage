import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { Site } from 'src/app/core/models/site.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { AddCategoryComponent } from 'src/app/shared/components/add-category/add-category.component';
import { AddSiteComponent } from 'src/app/shared/components/add-site/add-site.component';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
})
export class CategoryPage implements OnInit{
  sites: Site[];
  category!: Category;
 
  constructor(private modal: ModalController, private categoryService: CategoryService) {
    this.category = new Category(
      history.state.category['color'],
      history.state.category['title']
    );

    console.log(this.category);

    this.sites = categoryService.getSites(this.category);

    console.log(this.sites);
  }

  ngOnInit(): void {
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

  addNewSite(site: Site) {
    this.sites.push(site);
    this.categoryService.setCategory(this.category.getTitle(), this.category.getColor(), this.sites)
    console.log(this.sites);
  }

}
