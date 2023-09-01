import { NgClass, NgIf } from '@angular/common';
import { tasksActions } from './../../../store/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Board } from 'src/app/core/models/board.model';
import { CREATE_BOARD_KEY } from 'src/app/features/home/create-board-modal/create-board-modal.component';
@Component({
  standalone: true,
  imports: [MatIconModule, NgClass, NgIf],
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardItemComponent {
  @Input() board: Board;
  @Input() isActive = false;

  constructor(private modalService: ModalService, private store: Store) {}

  onItemClick() {
    this.store.dispatch(tasksActions.setActiveBoard({ board: this.board }));
  }

  onEdit(event: MouseEvent) {
    event.stopPropagation()
    this.modalService.setModalOptions({
      key: CREATE_BOARD_KEY,
      board: this.board,
    });
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation()
    this.store.dispatch(tasksActions.deleteBoard({ id: this.board.id }));
  }
}
