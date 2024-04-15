import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent  implements OnInit {
  @Input() modal!: ModalController;
  addCategoryForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.makeForm();
  }

  addCategory(title: string, color: string) {
    const category = new Category(color, title);
    this.modal.dismiss(category, 'completed')
  }

  makeForm() {
    this.addCategoryForm = new FormGroup({
      color: new FormControl(null, [
        Validators.required,
      ]),
      title: new FormControl(null, [
        Validators.required,
      ]),
    })
  }
}
