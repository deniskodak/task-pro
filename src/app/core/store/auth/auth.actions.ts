import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

export enum AuthActionsTypes {
  LoginStart = 'LoginStart',
  SignStart = 'SignStart',
  AuthFail = 'AuthFail',
  AuthSuccess = 'AuthSuccess',
  ClearError = 'ClearError',
  Logout = 'Logout',
  AutoLogin = 'AutoLogin',
  AutoLogout = 'AutoLogout',
}

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    [AuthActionsTypes.AuthSuccess]: props<{ user: User; redirect: boolean }>(),
    [AuthActionsTypes.LoginStart]: props<{ email: string; password: string }>(),
    [AuthActionsTypes.SignStart]: props<{ email: string; password: string, name: string }>(),
    [AuthActionsTypes.AuthFail]: props<{ message: string }>(),
    [AuthActionsTypes.ClearError]: emptyProps(),
    [AuthActionsTypes.AutoLogin]: emptyProps(),
    [AuthActionsTypes.AutoLogout]: emptyProps(),
    [AuthActionsTypes.Logout]: emptyProps(),
  },
});
