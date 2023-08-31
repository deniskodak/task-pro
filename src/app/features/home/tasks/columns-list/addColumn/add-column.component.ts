import { CREATE_PROJECT_KEY } from './../../create-project-modal/create-project-modal.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { SquareButtonComponent } from 'src/app/shared/squre-button/squre-button.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [SquareButtonComponent],
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss'],
})
export class AddColumnComponent {
  constructor(private modalService: ModalService) {}

  onAddColumn() {
    this.modalService.setModalOptions({ key: CREATE_PROJECT_KEY });
  }
}
