import { AppState } from '../store/store';
import { authActions } from 'src/app/core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<AppState>) {}

  clearLogoutTimer() {
    if (!this.tokenExpirationTimer) return;

    clearTimeout(this.tokenExpirationTimer);
    this.clearLogoutTimer = null;
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(authActions.logout());
    }, expirationDuration);
  }
}
