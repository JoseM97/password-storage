import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Preferences } from '@capacitor/preferences';
import { Site } from '../models/site.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories!: Category[];

  constructor() { }

  /**
   * This function delete all storage and create new categories with the array given
   * @param categories Array with all categories
   */
  async saveCategories(categories: Category[]) {
    try {
      await Preferences.set({
        key: 'categories',
        value: JSON.stringify(categories)
      });
      //console.log('Categorías guardadas correctamente.');
    } catch (error) {
      console.error('Error al guardar categorías:', error);
    }
  }

  async getAllCategories(): Promise<Category[] | null> {
    try {
      const result = await Preferences.get({ key: 'categories' });
      if (result && result.value) {
        this.categories = JSON.parse(result.value) as Category[];
        return this.categories as Category[];
      } else {
        //console.log('No hay categorías guardadas.');
        return null;
      }
    } catch (error) {
      console.error('Error al recuperar categorías:', error);
      return null;
    }
  }
}
