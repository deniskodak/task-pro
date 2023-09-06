import { authActions } from './../auth/auth.actions';
import { Project } from './../../models/project.model';
import { Board } from './../../models/board.model';
import { createReducer, on } from '@ngrx/store';
import { tasksActions } from './tasks.actions';
import { TaskPriority } from 'src/app/shared/constants/priority';

export interface TasksState {
  boards: Board[];
  projects: Project[];
  filteredProjects: Project[];
  projectFilter: Filter;
  selectedBoard: Board;
  loadingBoards: boolean;
  loadingProjects: boolean;
  boardImages: BoardImages[];
}

export type Filter = TaskPriority | 'all';

export interface BoardImages {
  name: string;
  backgroundImage: {
    web: {
      baseUrl: string;
      '2xUrl': string;
    };
  };
  previewImage: {
    baseUrl: string;
    '2xUrl': string;
  };
}

const initialState: TasksState = {
  boards: [],
  selectedBoard: null,
  projects: [],
  filteredProjects: [],
  projectFilter: 'all',
  loadingBoards: false,
  loadingProjects: false,
  boardImages: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(authActions.logout, () => ({
    ...initialState,
  })),
  on(tasksActions.fetchBoards, (state, action) => ({
    ...state,
    boards: action.boards,
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
    projectFilter: 'all' as Filter,
  })),
  on(tasksActions.fetchBoardsStart, (state) => ({
    ...state,
    loadingBoards: true,
  })),
  on(tasksActions.setBoardImages, (state, action) => ({
    ...state,
    boardImages: action.images,
  })),
  on(tasksActions.setFilteredProjects, (state, action) => ({
    ...state,
    filteredProjects: action.projects,
  })),
  on(tasksActions.setProjectFilter, (state, action) => ({
    ...state,
    projectFilter: action.filter,
  }))
);
