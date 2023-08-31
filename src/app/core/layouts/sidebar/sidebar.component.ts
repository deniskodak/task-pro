import { authActions } from './../../store/auth/auth.actions';
import { BoardListComponent } from './board-list/board-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FaqInfoComponent } from './faq-info/faq-info.component';
import { NewBoardComponent } from './new-board/new-board.component';
import {
  LogoComponent,
  LogoSizes,
} from './../../../shared/logo/logo.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [
    LogoComponent,
    NewBoardComponent,
    FaqInfoComponent,
    MatIconModule,
    BoardListComponent,
  ],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  logoSize = LogoSizes.Small;

  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(authActions.logout());
  }
}
