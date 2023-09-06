import { filter } from 'rxjs/operators';
import { Task } from './../../models/task.model';
import { Project } from './../../models/project.model';
import { Board } from './../../models/board.model';
import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { BoardImages, Filter } from './tasks.reducers';

export enum TasksActionTypes {
  FetchBoards = 'FetchBoards',
  FetchBoardsStart = 'FetchBoardsStart',
  FetchProjects = 'FetchProjects',
  FetchProjectsStart = 'FetchProjectsStart',
  AddBoard = 'AddBoard',
  AddTask = 'AddTask',
  AddProject = 'AddProject',
  DeleteBoard = 'DeleteBoard',
  DeleteTask = 'DeleteTask',
  DeleteProject = 'DeleteProject',
  EditBoard = 'EditBoard',
  EditProject = 'EditProject',
  EditTask = 'EditTask',
  SetActiveBoard = 'SetActiveBoard',
  FetchBoardImages = 'FetchBoardImages',
  SetBoardImages = 'SetBoardImages',
  SetProjectFilter = 'SetProjectFilter',
  SetFilteredProjects = 'SetFilteredProjects',
}

export const tasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    [TasksActionTypes.FetchBoards]: props<{ boards: Board[] }>(),
    [TasksActionTypes.FetchBoardsStart]: emptyProps(),
    [TasksActionTypes.FetchProjects]: props<{ projects: Project[] }>(),
    [TasksActionTypes.FetchProjectsStart]: emptyProps(),
    [TasksActionTypes.AddBoard]: props<{ board: Board }>(),
    [TasksActionTypes.AddProject]: props<{ project: Project }>(),
    [TasksActionTypes.AddTask]: props<{ task: Task; projectId: string }>(),
    [TasksActionTypes.DeleteBoard]: props<{ id: string }>(),
    [TasksActionTypes.DeleteProject]: props<{ id: string }>(),
    [TasksActionTypes.DeleteTask]: props<{ task: Task; projectId: string }>(),
    [TasksActionTypes.EditBoard]: props<{ board: Board }>(),
    [TasksActionTypes.EditProject]: props<{ title: string; id: string }>(),
    [TasksActionTypes.EditTask]: props<{ task: Task; projectId: string }>(),
    [TasksActionTypes.SetActiveBoard]: props<{ board: Board }>(),
    [TasksActionTypes.FetchBoardImages]: emptyProps(),
    [TasksActionTypes.SetBoardImages]: props<{ images: BoardImages[] }>(),
    [TasksActionTypes.SetProjectFilter]: props<{ filter: Filter }>(),
    [TasksActionTypes.SetFilteredProjects]: props<{ projects: Project[] }>(),
  },
});
