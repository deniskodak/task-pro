import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  tasksBoardsSelector,
  tasksSelectedBoardSelector,
} from 'src/app/core/store/tasks/tasks.selectors';
import { Board } from 'src/app/core/models/board.model';
import { BoardItemComponent } from '../board-item/board-item.component';
import { tasksActions } from 'src/app/core/store/tasks/tasks.actions';

@Component({
  standalone: true,
  imports: [AsyncPipe, BoardItemComponent, NgFor],
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards$: Observable<Board[]>;
  selectedBoard: Board = null;
  selectedBoardSub: Subscription;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(tasksBoardsSelector);
    this.selectedBoardSub = this.store
      .select(tasksSelectedBoardSelector)
      .subscribe((board) => {
        this.selectedBoard = board;
      });
  }

  onBoardClick(board: Board) {
    if(this.selectedBoard?.id !== board.id) {
      this.store.dispatch(tasksActions.setActiveBoard({ board }));
    }
  }
  
  ngOnDestroy(): void {
    this.selectedBoardSub.unsubscribe();
  }
}
