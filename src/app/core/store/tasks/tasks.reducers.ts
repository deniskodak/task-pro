import { authActions } from './../auth/auth.actions';
import { Project } from './../../models/project.model';
import { Board } from './../../models/board.model';
import { createReducer, on } from '@ngrx/store';
import { tasksActions } from './tasks.actions';

export interface TasksState {
  boards: Board[];
  projects: Project[];
  selectedBoard: Board;
  loadingBoards: boolean;
  loadingProjects: boolean;
}

const initialState: TasksState = {
  boards: [],
  selectedBoard: null,
  projects: [],
  loadingBoards: false,
  loadingProjects: false,
};

export const tasksReducer = createReducer(
  initialState,
  on(authActions.logout, () => ({
    ...initialState,
  })),
  on(tasksActions.fetchBoards, (state, action) => ({
    ...state,
    boards: action.boards,
    projects: [],
    loadingBoards: false,
  })),
  on(tasksActions.fetchProjects, (state, action) => ({
    ...state,
    projects: action.projects,
    loadingProjects: false,
  })),
  on(tasksActions.setActiveBoard, (state, action) => ({
    ...state,
    selectedBoard: action.board,
    loadingProjects: true,
  })),
  on(tasksActions.fetchBoardsStart, (state) => ({
    ...state,
    loadingBoards: true,
  }))
);
