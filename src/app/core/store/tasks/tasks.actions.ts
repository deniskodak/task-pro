import { Task } from './../../models/task.model';
import { Project } from './../../models/project.model';
import { Board } from './../../models/board.model';
import { props, createActionGroup, emptyProps } from '@ngrx/store';

export enum TasksActionTypes {
  FetchBoards = 'FetchBoards',
  FetchBoardsStart = 'FetchBoardsStart',
  FetchProjects = 'FetchProjects',
  AddBoard = 'AddBoard',
  AddTask = 'AddTask',
  AddProject = 'AddProject',
  DeleteBoard = 'DeleteBoard',
  DeleteTask = 'DeleteTask',
  DeleteProject = 'DeleteProject',
  EditBoard = 'EditBoard',
  EditProjectTitle = 'EditProjectTitle',
  EditTask = 'EditTask',
}

export const tasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    [TasksActionTypes.FetchBoards]: props<{ boards: Board[] }>(),
    [TasksActionTypes.FetchBoardsStart]: emptyProps(),
    [TasksActionTypes.FetchProjects]: props<{ projects: Project[] }>(),
    [TasksActionTypes.AddBoard]: props<{ board: Board }>(),
    [TasksActionTypes.AddProject]: props<{ project: Project }>(),
    [TasksActionTypes.AddTask]: props<{ task: Task }>(),
    [TasksActionTypes.DeleteBoard]: props<{ id: string }>(),
    [TasksActionTypes.DeleteProject]: props<{ id: string }>(),
    [TasksActionTypes.DeleteTask]: props<{ id: string }>(),
    [TasksActionTypes.EditBoard]: props<{ board: Board }>(),
    [TasksActionTypes.EditProjectTitle]: props<{ title: string }>(),
    [TasksActionTypes.EditTask]: props<{ task: Task }>(),
  },
});
