import { AngularFireStorage } from '@angular/fire/compat/storage';
import { tasksBoardsSelector } from 'src/app/core/store/tasks/tasks.selectors';
import {
  tasksSelectedBoardSelector,
  tasksProjectsSelector,
} from './tasks.selectors';
import { DatabaseUser } from './../../models/database-user.model';
import { authUserSelector } from './../auth/auth.selectors';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  filter,
  first,
  map,
  switchMap,
  toArray,
} from 'rxjs/operators';
import { tasksActions } from './tasks.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of, Observable, combineLatest, from } from 'rxjs';
import { Board } from '../../models/board.model';
import { Project } from '../../models/project.model';
import { BoardImages } from './tasks.reducers';

enum CollectionKeys {
  Users = '/users',
  Boards = '/boards',
  Tasks = '/tasks',
  BoardImages = '/boardImages',
}

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private db: AngularFireDatabase,
    private fs: AngularFireStorage
  ) {}

  private commonStore$ = combineLatest([
    this.store.select(tasksSelectedBoardSelector),
    this.store.select(tasksProjectsSelector),
    this.store.select(authUserSelector),
  ]).pipe(
    map(([selectedBoard, boardProjects, user]) => ({
      board: selectedBoard,
      projects: boardProjects,
      user,
    }))
  );

  setBoards = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.fetchBoardsStart),
      switchMap(() =>
        this.store.select(authUserSelector).pipe(
          first(),
          switchMap((user) =>
            this.db.object(`${CollectionKeys.Users}/${user.id}`).valueChanges()
          ),
          switchMap((user: DatabaseUser) =>
            of(tasksActions.fetchBoards({ boards: user.boards || [] }))
          )
        )
      )
    )
  );

  editBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.editBoard),
      switchMap((action) =>
        this.getUser().pipe(
          switchMap((user) =>
            this.getBoards(user).pipe(
              switchMap((boards) => {
                const key = boards
                  ? boards.findIndex(
                      (board: Board) => board.id === action.board.id
                    )
                  : 0;

                return this.db
                  .list(`${CollectionKeys.Users}/${user.id}/boards`)
                  .update(String(key === -1 ? 0 : key), action.board)
                  .then(() => tasksActions.fetchBoardsStart())
                  .catch(() => ({ type: 'invalid' }));
              })
            )
          )
        )
      )
    )
  );

  addBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.addBoard),
      switchMap((action) =>
        this.getUser().pipe(
          switchMap((user) =>
            this.getBoards(user).pipe(
              switchMap((boards) => {
                const key = boards ? boards.length : 0;
                return this.db
                  .list(`${CollectionKeys.Users}/${user.id}/boards`)
                  .update(String(key), action.board)
                  .then(() => tasksActions.fetchBoardsStart())
                  .catch(() => ({ type: 'invalid' }));
              })
            )
          )
        )
      )
    )
  );

  deleteSelectedBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.deleteBoard),
      switchMap((board) =>
        this.getSelectedBoard().pipe(
          map((selectedBoard) => {
            if (selectedBoard?.id === board.id) {
              return tasksActions.setActiveBoard({ board: null });
            } else {
              return { type: 'invalid' };
            }
          })
        )
      )
    )
  );

  deleteBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.deleteBoard),
      switchMap((action) =>
        this.getUser().pipe(
          switchMap((user) =>
            this.store.select(tasksBoardsSelector).pipe(
              first(),
              switchMap((boards: Board[]) => {
                return this.db
                  .list(`${CollectionKeys.Users}/${user.id}`)
                  .set(
                    'boards',
                    boards.filter((board) => board.id !== action.id)
                  )
                  .then(() => tasksActions.fetchBoardsStart())
                  .catch(() => ({ type: 'invalid' }));
              })
            )
          )
        )
      )
    )
  );

  setSelectedBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.fetchBoards),
      switchMap((action) =>
        this.store.select(tasksSelectedBoardSelector).pipe(
          first(),
          map((selectedBoard) => {
            const newSelectedBoard =
              !selectedBoard && action.boards.length > 0
                ? action.boards[0]
                : action.boards.find(
                    (board) => board.id === selectedBoard?.id
                  ) || null;

            return tasksActions.setActiveBoard({ board: newSelectedBoard });
          })
        )
      )
    )
  );

  setProjectFilter = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.setProjectFilter),
      switchMap(({ filter }) =>
        this.commonStore$.pipe(
          map(({ projects }) => {
            const filteredProjects = projects.map((project) => ({
              ...project,
              tasks: project.tasks.filter(
                (task) => filter === 'all' || task.labelColor === filter
              ),
            }));

            return tasksActions.setFilteredProjects({
              projects: filteredProjects,
            });
          })
        )
      )
    )
  );

  addProject = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.addProject),
      switchMap((action) =>
        this.getSelectedBoardIdAndProjects().pipe(
          switchMap(({ board, projects }) => {
            const newProjects = projects.concat([action.project]);
            return this.updateProject(board.id, newProjects);
          })
        )
      )
    )
  );

  editProject = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.editProject),
      switchMap((action) =>
        this.getSelectedBoardIdAndProjects().pipe(
          switchMap(({ board, projects }) => {
            const newProjects = projects.map((project) =>
              project.id === action.id
                ? { ...project, title: action.title }
                : project
            );
            return this.updateProject(board.id, newProjects);
          })
        )
      )
    )
  );

  deleteProject = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.deleteProject),
      switchMap((action) =>
        this.getSelectedBoardIdAndProjects().pipe(
          switchMap(({ board, projects }) => {
            const newProjects = projects.filter(
              (project) => project.id !== action.id
            );
            return this.updateProject(board.id, newProjects);
          })
        )
      )
    )
  );

  fetchProjects = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.setActiveBoard),
      filter((action) => action.board !== null),
      switchMap(() => this.commonStore$.pipe(first())),
      switchMap(({ board }) => this.getProjectsById(board.id)),
      map((projects) => tasksActions.fetchProjects({ projects }))
    )
  );

  fetchFilteredProjects = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.fetchProjects),
      map((action) =>
        tasksActions.setFilteredProjects({ projects: action.projects })
      )
    )
  );

  addTask = createEffect(() =>
    this.actions$.pipe(
      ofType(
        tasksActions.addTask,
        tasksActions.editTask,
        tasksActions.deleteTask
      ),
      switchMap((action) =>
        this.commonStore$.pipe(
          first(),
          switchMap(({ board, projects }) => {
            const projectIndex = projects.findIndex(
              (project) => project.id === action.projectId
            );
            if (projectIndex < 0) {
              return of({ type: 'invalid' });
            }
            const project = projects[projectIndex];
            const { type, task } = action;
            const projectsTasks = project.tasks || [];
            let updatedProjectTasks = [];
            switch (type) {
              case '[Tasks] AddTask':
                updatedProjectTasks = projectsTasks.concat([action.task]);
                break;
              case '[Tasks] EditTask':
                updatedProjectTasks = projectsTasks.map((projectTask) =>
                  projectTask.id === task.id ? task : projectTask
                );
                break;
              case '[Tasks] DeleteTask':
                updatedProjectTasks = projectsTasks.filter(
                  ({ id }) => id !== task.id
                );
            }

            const updateProject = new Project(
              project.title,
              project.id,
              updatedProjectTasks
            );

            return this.db
              .list(`${CollectionKeys.Boards}/${board.id}`)
              .set(String(projectIndex), updateProject)
              .then(() => {
                const copiedProjects = projects.slice();
                copiedProjects.splice(projectIndex, 1, updateProject);

                return tasksActions.fetchProjects({ projects: copiedProjects });
              });
          })
        )
      ),
      catchError(() => of({ type: 'invalid' }))
    )
  );

  fetchBoardImages = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.fetchBoardImages),
      switchMap(() =>
        this.db.list<BoardImages>(CollectionKeys.BoardImages).valueChanges()
      ),
      switchMap((list) => of(tasksActions.setBoardImages({ images: list }))),
      catchError(() => of(tasksActions.setBoardImages({ images: [] })))
    )
  );

  private getSelectedBoardIdAndProjects() {
    return this.getSelectedBoard().pipe(
      switchMap((board) =>
        this.getProjectsById(board.id).pipe(
          switchMap((projects) => of({ board, projects }))
        )
      )
    );
  }

  private getUser() {
    return this.store.select(authUserSelector).pipe(first());
  }

  private getSelectedBoard() {
    return this.store.select(tasksSelectedBoardSelector).pipe(first());
  }

  private getBoards(user) {
    return this.getListByPath(`${CollectionKeys.Users}/${user.id}/boards`);
  }

  private getProjectsById(boardId) {
    return this.getListByPath(
      `${CollectionKeys.Boards}/${boardId}`
    ) as Observable<Project[]>;
  }

  private getListByPath(collectionPath) {
    return this.db.list(collectionPath).valueChanges().pipe(first());
  }

  private updateProject(boardId: string, projects: Project[]) {
    return this.db
      .list(CollectionKeys.Boards)
      .set(boardId, projects)
      .then(() => {
        return tasksActions.fetchProjects({ projects });
      })
      .catch(() => ({ type: 'invalid' }));
  }
}
