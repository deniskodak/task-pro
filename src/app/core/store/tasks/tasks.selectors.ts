import { AppState } from 'src/app/core/store/store';

export const tasksBoardsSelector = (state: AppState) => state.tasks.boards;
export const tasksSelectedBoardSelector = (state: AppState) =>
  state.tasks.selectedBoard;
export const tasksProjectsSelector = (state: AppState) => state.tasks.projects;
export const tasksTasksSelector = (projectId) => (state: AppState) => {
  const project = state.tasks.filteredProjects.find(({ id }) => projectId === id);
  return project?.tasks || [];
};
export const tasksLoadingBoardsSelector = (state: AppState) =>
  state.tasks.loadingBoards;

export const tasksLoadingProjectsSelector = (state: AppState) =>
  state.tasks.loadingProjects;

export const tasksBoardImagesSelector = (state: AppState) =>
  state.tasks.boardImages;

export const tasksProjectFilterSelector = (state: AppState) =>
  state.tasks.projectFilter;

export const taskFilteredProjectsSelector = (state: AppState) =>
  state.tasks.filteredProjects;
