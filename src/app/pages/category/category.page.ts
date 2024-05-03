import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { Site } from 'src/app/core/models/site.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { AddSiteComponent } from 'src/app/shared/components/add-site/add-site.component';
import { Clipboard } from '@capacitor/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
})
export class CategoryPage implements OnInit{
  sites: Site[] = []; // Where we gonna save the actually sites sum new ones
  categories!: Category[]; // Where we save all categories from categoryService

  category!: Category;
  canDelete!: boolean;
  
 
  constructor(private modal: ModalController, private categoryService: CategoryService, private router: Router) {
    this.category = new Category('', '');
  }

  async ngOnInit() {
    this.canDelete = false;
    this.categories = await this.categoryService.getAllCategories() || [];
    const aux = this.categories.find((element) => element['title'] === history.state.category['title']);

    this.category = new Category(
      aux!['color'],
      aux!['title']
    );
    this.category.setSites(aux!['sites']);
  }

  async openAddSiteModal() {
    const modal = await this.modal.create({
      component: AddSiteComponent,
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(role === 'completed') {
      this.addNewSite(data);
    }
  }

  async addNewSite(site: Site) {
    this.sites = this.category.getSites();
    this.sites.push(site);
    
    Preferences.clear();
    this.categoryService.saveCategories(this.categories);
  }

  deleteSite(site: Site) {
    this.sites = this.category.getSites();
    this.sites.indexOf(site) == 0 ? this.sites.splice(this.sites.indexOf(site), this.sites.indexOf(site)+1) : this.sites.splice(this.sites.indexOf(site), this.sites.indexOf(site))
  
    Preferences.clear();
    this.categoryService.saveCategories(this.categories);
  }

  async share (title: string, user: string, password: string){
    if(await Share.canShare()) {
      await Share.share({
        title: title,
        text: 'user: ' + user + ' password: ' + password,
        });
    }
  }

  async copyPaste(text: string) {
    await Clipboard.write({
      string: text
    });
    alert('¡datos copiados!');
  }

  goToCategory(): void {
    this.router.navigate(['/home']);
  }

  async deleteCategory(categoryGiven: any) {
    this.categories.forEach(category => {
      if(categoryGiven['title'] === category['title']) {
        console.log(this.categories.indexOf(category));
        this.categories.indexOf(category) == 0 ? this.categories.splice(this.categories.indexOf(category), this.categories.indexOf(category)+1) : this.categories.splice(this.categories.indexOf(category), this.categories.indexOf(category))
    
      }
    });
    Preferences.clear();
    this.categoryService.saveCategories(this.categories);
    this.goToCategory();
  }

  activateDelete() {
    this.canDelete = !this.canDelete;
  }

}
