import { authActions } from 'src/app/core/store/auth/auth.actions';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'task-pro';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.autoLogin())
  }
}
