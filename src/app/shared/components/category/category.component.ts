import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-shared-components-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category!: Category;

  constructor(private router: Router,) {}

  goToCategory(title: string){
    this.router.navigate(['/category/' + title],
    {
      state: {
        category: this.category,
      }
    });
  }

}
