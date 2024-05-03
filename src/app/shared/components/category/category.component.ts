import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-shared-components-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() category!: Category;
  @Input() categories!: Category[];
  newCategory!: Category;

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.createCategory();
  }

  /**
   * Recive an array and create new Category
   * @returns newCategory as Category instance
   */
  createCategory() {
    this.newCategory = new Category(this.category['color'], this.category['title']);
    this.newCategory.setSites(this.category['sites']);
    return this.newCategory;
  }

  goToCategory(title: string): void {
    this.router.navigate(['/category/' + title],
    {
      state: {
        category: this.category,
        categories: this.category,
      }
    });
  }
}