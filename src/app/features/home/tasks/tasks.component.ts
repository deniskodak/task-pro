import { ColumnsListComponent } from './columns-list/columns-list.component';
import {
  tasksBoardsSelector,
  tasksSelectedBoardSelector,
} from 'src/app/core/store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgClass, NgIf, AsyncPipe, NgFor } from '@angular/common';
import { EmptyPlaceholderComponent } from './emptyPlaceholder/empty-placeholder.component';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Board } from 'src/app/core/models/board.model';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [
    EmptyPlaceholderComponent,
    NgClass,
    NgIf,
    AsyncPipe,
    NgFor,
    ColumnsListComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  boards$: Observable<Board[]>;
  selectedBoard$: Observable<Board>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(tasksBoardsSelector);
    this.selectedBoard$ = this.store.select(tasksSelectedBoardSelector);
  }
}
