import { tasksLoadingBoardsSelector } from './../../store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { LoaderComponent, LoaderSize } from './../../../shared/loader/loader.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { authActions } from './../../store/auth/auth.actions';
import { BoardListComponent } from './board-list/board-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FaqInfoComponent } from './faq-info/faq-info.component';
import { NewBoardComponent } from './new-board/new-board.component';
import {
  LogoComponent,
  LogoSizes,
} from './../../../shared/logo/logo.component';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [
    LogoComponent,
    NewBoardComponent,
    FaqInfoComponent,
    MatIconModule,
    BoardListComponent,
    NgIf,
    AsyncPipe,
    LoaderComponent,
  ],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  logoSize = LogoSizes.Small;
  loaderSize = LoaderSize.Small;
  loading$: Observable<Boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(tasksLoadingBoardsSelector);
  }

  onLogout() {
    this.store.dispatch(authActions.logout());
  }
}
