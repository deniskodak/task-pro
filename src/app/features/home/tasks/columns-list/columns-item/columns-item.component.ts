import { CREATE_PROJECT_KEY } from './../../create-project-modal/create-project-modal.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-columns-item',
  templateUrl: './columns-item.component.html',
  styleUrls: ['./columns-item.component.scss'],
})
export class ColumnsItemComponent {
  @Input() column: Project;

  constructor(private modalService: ModalService) {}

  onEdit() {
    this.modalService.setModalOptions({
      key: CREATE_PROJECT_KEY,
      project: this.column,
    });
  }

  onDelete() {}
}
