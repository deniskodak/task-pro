import { tasksActions } from './../../../store/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Board } from 'src/app/core/models/board.model';
import { CREATE_BOARD_KEY } from 'src/app/features/home/create-board-modal/create-board-modal.component';
@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardItemComponent {
  @Input() board: Board;

  constructor(private modalService: ModalService, private store: Store) {}

  onEdit() {
    this.modalService.setModalOptions({
      key: CREATE_BOARD_KEY,
      board: this.board,
    });
  }

  onDelete() {
    this.store.dispatch(tasksActions.deleteBoard({ id: this.board.id }));
  }
}
