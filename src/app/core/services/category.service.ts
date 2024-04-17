import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  async storageCategory(category: Category) {
    await Preferences.set({
        key: category.getTitle(),
        value: JSON.stringify(category),
      });
  }
}
