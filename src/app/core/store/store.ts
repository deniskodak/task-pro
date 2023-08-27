import { AuthState, authReducer } from './auth/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const store = {
  auth: authReducer,
};
