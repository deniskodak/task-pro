import { BoardImages } from './../../../core/store/tasks/tasks.reducers';
import { map } from 'rxjs/operators';
import { tasksBoardImagesSelector } from './../../../core/store/tasks/tasks.selectors';
import { ColumnsListComponent } from './columns-list/columns-list.component';
import {
  tasksBoardsSelector,
  tasksSelectedBoardSelector,
} from 'src/app/core/store/tasks/tasks.selectors';
import { Observable, combineLatest, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgClass, NgIf, AsyncPipe, NgFor } from '@angular/common';
import { EmptyPlaceholderComponent } from './emptyPlaceholder/empty-placeholder.component';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Board } from 'src/app/core/models/board.model';

const darkBackgrounds = ['planet', 'moon', 'rocks', 'mounts', 'sky', 'sand', 'boat', 'jungle']

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
export class TasksComponent implements OnInit, OnDestroy {
  boards$: Observable<Board[]>;
  selectedBoard$: Observable<Board>;
  boardImage: BoardImages;
  destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(tasksBoardsSelector);
    this.selectedBoard$ = this.store.select(tasksSelectedBoardSelector);

    combineLatest([
      this.store.select(tasksBoardImagesSelector),
      this.store.select(tasksSelectedBoardSelector),
    ])
      .pipe(
        map(([boardImages, board]) =>
          boardImages.find((item) => item.name === board?.backgroundImg)
        )
      )
      .subscribe((boardImage) => {
        this.boardImage = boardImage;
        this.changeDetectorRef.detectChanges();
      });
  }

  getBackgroundImageSrcset() {
    const { web } = this.boardImage.backgroundImage;
    return `${web.baseUrl}, ${web['2xUrl']} 2x`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isDarkBackground() {
    return darkBackgrounds.includes(this.boardImage?.name)
  }
}
