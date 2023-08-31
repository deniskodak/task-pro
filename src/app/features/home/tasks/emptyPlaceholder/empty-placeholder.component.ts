import { CREATE_BOARD_KEY } from 'src/app/features/home/create-board-modal/create-board-modal.component';
import { ModalService } from './../../../../core/services/modal.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyPlaceholderComponent {
  constructor(private modalService: ModalService) {}

  onLinkClick() {
    this.modalService.setModalOptions({ key: CREATE_BOARD_KEY });
  }
}
