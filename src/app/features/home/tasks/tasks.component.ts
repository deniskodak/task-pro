import { ModalService } from 'src/app/core/services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import {
  BoardImages,
  Filter,
} from './../../../core/store/tasks/tasks.reducers';

import { ColumnsListComponent } from './columns-list/columns-list.component';
import {
  tasksBoardsSelector,
  tasksSelectedBoardSelector,
  tasksProjectFilterSelector,
  tasksBoardImagesSelector,
} from 'src/app/core/store/tasks/tasks.selectors';
import { Observable, combineLatest, Subject, map } from 'rxjs';
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
import { FILTERS_KEY } from '../filters-modal/filters-modal.component';
import { MatBadgeModule } from '@angular/material/badge';

const darkBackgrounds = [
  'planet',
  'moon',
  'rocks',
  'mounts',
  'sky',
  'sand',
  'boat',
  'jungle',
];

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
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit, OnDestroy {
  boards$: Observable<Board[]>;
  selectedBoard$: Observable<Board>;
  projectFilter$: Observable<Filter>;
  boardImage: BoardImages;
  destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(tasksBoardsSelector);
    this.selectedBoard$ = this.store.select(tasksSelectedBoardSelector);
    this.projectFilter$ = this.store.select(tasksProjectFilterSelector);

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
    return darkBackgrounds.includes(this.boardImage?.name);
  }

  onFiltersClick() {
    this.modalService.setModalOptions({ key: FILTERS_KEY });
  }
}
