import { AppState } from 'src/app/core/store/store';

export const tasksBoardsSelector = (state: AppState) => state.tasks.boards;
export const tasksSelectedBoardSelector = (state: AppState) =>
  state.tasks.selectedBoard;
export const tasksProjectsSelector = (state: AppState) => state.tasks.projects;
export const tasksTasksSelector = (projectId) => (state: AppState) => {
    console.log('projectId', projectId)
  const project = state.tasks.projects.find(({ id }) => projectId === id);
  console.log(project, 'project')
  return project?.tasks || [];
};
export const tasksLoadingBoardsSelector = (state: AppState) =>
  state.tasks.loadingBoards;
export const tasksLoadingProjectsSelector = (state: AppState) =>
  state.tasks.loadingProjects;
