import { ModalService } from 'src/app/core/services/modal.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CREATE_BOARD_KEY } from 'src/app/features/home/create-board-modal/create-board-modal.component';
@Component({
  standalone: true,
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBoardComponent {
  constructor(private modalService: ModalService) {}

  onCreateBoard() {
    this.modalService.setModalOptions({ key: CREATE_BOARD_KEY });
  }
}
