import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Site } from 'src/app/core/models/site.model';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.scss'],
})
export class AddSiteComponent  implements OnInit {

  @Input() modal!: ModalController;
  addSiteForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.makeForm();
  }

  addSite() {
    console.log(this.addSiteForm.get('title')?.value);
    console.log(this.addSiteForm.get('user')?.value);
    console.log(this.addSiteForm.get('password')?.value);
    const aux = new Site(this.addSiteForm.get('title')?.value, this.addSiteForm.get('user')?.value, this.addSiteForm.get('password')?.value);
    this.modal.dismiss(aux, 'completed');
  }

  private makeForm(): void {
    this.addSiteForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      user: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
    })
  }

}
