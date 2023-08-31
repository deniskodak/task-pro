import { TasksComponent } from './tasks/tasks.component';
import { tasksBoardsSelector } from 'src/app/core/store/tasks/tasks.selectors';
import { NeedHelpModalComponent } from './need-help-modal/need-help-modal.component';
import { CreateBoardModalComponent } from './create-board-modal/create-board-modal.component';
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
    NgIf,
    AsyncPipe,
    TasksComponent,
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

  constructor(
    private readonly layoutService: LayoutService,
    private store: Store,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.layoutType$ = this.layoutService.layoutType$;
    this.sidebarShown$ = this.sidebarService.isShown$;
    this.boards$ = this.store.select(tasksBoardsSelector);
    this.store.dispatch(tasksActions.fetchBoardsStart());
  }

  onBackdropClick() {
    this.sidebarService.hide();
  }
}
