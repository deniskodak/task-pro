import { AppState } from 'src/app/core/store/store';

export const authUserSelector = (state: AppState) => state.auth.user;
export const authLoadingSelector = (state: AppState) => state.auth.loading;
export const authErrorSelector = (state: AppState) => state.auth.authError;
