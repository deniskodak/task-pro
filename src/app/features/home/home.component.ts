import { NeedHelpModalComponent } from './need-help-modal/need-help-modal.component';
import { CreateBoardModalComponent } from './create-board-modal/create-board-modal.component';
import { tasksActions } from './../../core/store/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { SidebarService } from './../../core/services/sidebar.service';
import { SidebarComponent } from './../../core/layouts/sidebar/sidebar.component';
import { HeaderComponent } from './../../core/layouts/header/header.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { DatabaseUserService } from 'src/app/core/services/database.service';

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
  ],
  providers: [DatabaseUserService],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly breakpoints = Breakpoints;

  layoutType$: Observable<string>;
  sidebarShown$: Observable<boolean>;

  constructor(
    private readonly layoutService: LayoutService,
    private databaseUserService: DatabaseUserService,
    private store: Store,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.layoutType$ = this.layoutService.layoutType$;
    this.sidebarShown$ = this.sidebarService.isShown$;
    this.store.dispatch(tasksActions.fetchBoardsStart());
  }

  onBackdropClick() {
    this.sidebarService.hide();
  }
}
