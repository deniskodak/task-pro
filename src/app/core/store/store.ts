import { tasksReducer, TasksState } from './tasks/tasks.reducers';
import { AuthState, authReducer } from './auth/auth.reducer';

export interface AppState {
  auth: AuthState;
  tasks: TasksState;
}

export const store = {
  auth: authReducer,
  tasks: tasksReducer,
};
