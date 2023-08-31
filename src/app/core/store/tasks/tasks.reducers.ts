import { authActions } from './../auth/auth.actions';
import { Project } from './../../models/project.model';
import { Board } from './../../models/board.model';
import { createReducer, on } from '@ngrx/store';
import { tasksActions } from './tasks.actions';

export interface TasksState {
  boards: Board[];
  projects: Project[];
  selectedBoard: Board;
}

const initialState: TasksState = {
  boards: [],
  selectedBoard: null,
  projects: [],
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
  })),
  on(tasksActions.fetchProjects, (state, action) => ({
    ...state,
    projects: action.projects,
  }))
  // on(tasksActions.addBoard, (state, action) => {
  //   const copiedBoards = state.boards.slice();
  //   copiedBoards.push(action.board);
  //   return {
  //     ...state,
  //     boards: copiedBoards,
  //   };
  // }),
  //   on(tasksActions.addProject, (state, action) => {

  //   }),
  //   on(tasksActions.addTask, (state, action) => ({})),
  //   on(tasksActions.addBoard, (state, action) => {}),
  //   on(tasksActions.addBoard, (state, action) => {})
);
