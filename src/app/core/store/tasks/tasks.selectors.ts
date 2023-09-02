import { AppState } from 'src/app/core/store/store';

export const tasksBoardsSelector = (state: AppState) => state.tasks.boards;
export const tasksSelectedBoardSelector = (state: AppState) => state.tasks.selectedBoard;
export const tasksProjectsSelector = (state: AppState) => state.tasks.projects;
export const tasksLoadingBoardsSelector = (state: AppState) => state.tasks.loadingBoards;
export const tasksLoadingProjectsSelector = (state: AppState) => state.tasks.loadingProjects;
