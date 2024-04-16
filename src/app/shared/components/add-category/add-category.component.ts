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

  addCategory() {
    console.log(this.addCategoryForm.get('title')?.value);
    console.log(this.addCategoryForm.get('color')?.value);
    const aux = new Category(this.addCategoryForm.get('color')?.value, this.addCategoryForm.get('title')?.value);
    this.modal.dismiss(aux, 'completed');
  }

  private makeForm(): void {
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
