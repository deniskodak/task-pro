import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tasksBoardsSelector } from 'src/app/core/store/tasks/tasks.selectors';
import { Board } from 'src/app/core/models/board.model';
import { BoardItemComponent } from '../board-item/board-item.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, BoardItemComponent, NgFor],
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent implements OnInit {
  boards$: Observable<Board[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(tasksBoardsSelector);
  }
}
