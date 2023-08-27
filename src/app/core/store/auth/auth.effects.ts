import { AuthService } from 'src/app/core/services/auth.service';
import {authActions} from './auth.actions';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { User } from 'src/app/core/models/user.model';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export const AUTH_URL = {
  login:
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
    environment.FIREBASE_KEY,
  signup:
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
    environment.FIREBASE_KEY,
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signStart),
      switchMap(({ email, password }) =>
        this.http
          .post<AuthResponseData>(AUTH_URL.signup, {
            email: email,
            password: password,
            returnSecureToken: true,
          })
          .pipe(map(this.handleAuthenticate), catchError(this.handleError))
      )
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginStart),
      switchMap(({ email, password }) =>
        this.http
          .post<AuthResponseData>(AUTH_URL.login, {
            email: email,
            password: password,
            returnSecureToken: true,
          })
          .pipe(map(this.handleAuthenticate), catchError(this.handleError))
      )
    )
  );

  authAutoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'invalid' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token)
          return authActions.authSuccess({ user: loadedUser, redirect: false });
        return { type: 'invalid' };
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.authSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/recipes']);
          }
        })
      ),
    { dispatch: false }
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.autoLogout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  private handleAuthenticate = ({
    email,
    localId,
    idToken,
    expiresIn,
  }: AuthResponseData): Action => {
    const expiresInMs = +expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresInMs);
    const user = new User(email, localId, idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.authService.setLogoutTimer(expiresInMs);
    return authActions.authSuccess({ user, redirect: true });
  };

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(authActions.authFail({ message: errorMessage }));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return of(authActions.authFail({ message: errorMessage }));
  }
}
