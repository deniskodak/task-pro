import { tasksLoadingProjectsSelector } from './../../core/store/tasks/tasks.selectors';
import { LoaderComponent } from './../../shared/loader/loader.component';
import { NgSubDirective } from './../../shared/directives/sub.directive';
import { NEED_HELP_KEY, NeedHelpModalComponent } from 'src/app/features/home/need-help-modal/need-help-modal.component';
import { CREATE_BOARD_KEY, CreateBoardModalComponent } from 'src/app/features/home/create-board-modal/create-board-modal.component';
import { CREATE_PROJECT_KEY, CreateProjectModalComponent } from 'src/app/features/home/create-project-modal/create-project-modal.component';
import { CREATE_TASK_KEY, CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { ModalService, Options } from 'src/app/core/services/modal.service';
import { TasksComponent } from './tasks/tasks.component';
import { tasksBoardsSelector } from 'src/app/core/store/tasks/tasks.selectors';
import { tasksActions } from './../../core/store/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { SidebarService } from './../../core/services/sidebar.service';
import { SidebarComponent } from './../../core/layouts/sidebar/sidebar.component';
import { HeaderComponent } from './../../core/layouts/header/header.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LayoutService,
  Breakpoints,
} from 'src/app/core/services/layout.service';
import { Board } from 'src/app/core/models/board.model';

const MODAL_KEYS = {
  task: CREATE_TASK_KEY,
  project: CREATE_PROJECT_KEY,
  board: CREATE_BOARD_KEY,
  help: NEED_HELP_KEY,
};

@Component({
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    HeaderComponent,
    SidebarComponent,
    NgIf,
    CreateBoardModalComponent,
    NeedHelpModalComponent,
    CreateProjectModalComponent,
    CreateTaskModalComponent,
    NgIf,
    AsyncPipe,
    TasksComponent,
    NgSubDirective,
    LoaderComponent
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly breakpoints = Breakpoints;
  boards$: Observable<Board[]>;
  layoutType$: Observable<string>;
  sidebarShown$: Observable<boolean>;
  modalOptions$: Observable<Options>;
  loading$: Observable<boolean>;
  modalKeys = MODAL_KEYS;

  constructor(
    private readonly layoutService: LayoutService,
    private store: Store,
    private sidebarService: SidebarService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.layoutType$ = this.layoutService.layoutType$;
    this.sidebarShown$ = this.sidebarService.isShown$;
    this.boards$ = this.store.select(tasksBoardsSelector);
    this.store.dispatch(tasksActions.fetchBoardsStart());
    this.modalOptions$ = this.modalService.modalOptions$;
    this.loading$ = this.store.select(tasksLoadingProjectsSelector);
  }

  onBackdropClick() {
    this.sidebarService.hide();
  }
}
