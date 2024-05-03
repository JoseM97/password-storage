import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delete-all-confirm',
  templateUrl: './delete-all-confirm.component.html',
  styleUrls: ['./delete-all-confirm.component.scss'],
})
export class DeleteAllConfirmComponent {
  @Input() modal!: ModalController;

  constructor() {}

  deleteConfirm() {
    this.modal.dismiss('completed');
  }
}
