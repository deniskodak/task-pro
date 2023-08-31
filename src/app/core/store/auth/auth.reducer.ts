import { authActions } from './auth.actions';
import { User } from 'src/app/core/models/user.model';
import { createReducer, on } from '@ngrx/store';

export interface AuthState {
  user: User;
  authError: null | string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.authSuccess, (state, { user }) => ({
    user: new User(user.name, user.email, user.id, user.token, user.expiresIn),
    authError: null,
    loading: false,
  })),
  on(authActions.loginStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(authActions.signStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(authActions.authFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.message,
    loading: false,
  })),
  on(authActions.clearError, (state) => ({ ...state, authError: null })),
  on(authActions.logout, () => ({ ...initialState })),
);
