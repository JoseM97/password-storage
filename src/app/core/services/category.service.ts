import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Preferences } from '@capacitor/preferences';
import { Site } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getSites(category: Category) {
    return category.getSites();
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

  async getCategory(category: string) {
    const aux = await Preferences.get({key: category});
    const aux2 = JSON.parse(aux.value || '{}');
    const categoryAux = new Category(aux2['color'], aux2['title']);
    categoryAux.setSites(aux2['sites']);
    console.log(categoryAux);
    return categoryAux;
  }
}
