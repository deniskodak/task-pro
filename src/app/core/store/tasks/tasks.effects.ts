import { tasksBoardsSelector } from 'src/app/core/store/tasks/tasks.selectors';
import { tasksSelectedBoardSelector } from './tasks.selectors';
import { DatabaseUser } from './../../models/database-user.model';
import { authUserSelector } from './../auth/auth.selectors';
import { Store } from '@ngrx/store';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { tasksActions } from './tasks.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of, Observable } from 'rxjs';
import { Board } from '../../models/board.model';
import { Project } from '../../models/project.model';

enum CollectionKeys {
  Users = '/users',
  Boards = '/boards',
}

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private db: AngularFireDatabase
  ) {}

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
        this.store.select(tasksSelectedBoardSelector).pipe(
          first(),
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
            if (!selectedBoard && action.boards.length > 0)
              return tasksActions.setActiveBoard({ board: action.boards[0] });
            return { type: 'invalid' };
          })
        )
      )
    )
  );

  addProject = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.addProject),
      switchMap((action) =>
        this.getSelectedBoard().pipe(
          switchMap((board) =>
            this.db
              .list(`${CollectionKeys.Boards}/${board.id}`)
              .push(action.project)
              .then(() => {
                return tasksActions.fetchProjectsStart();
              })
              .catch(() => ({ type: 'invalid' }))
          )
        )
      )
    )
  );

  fetchProjects = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.setActiveBoard),
      filter(action => action.board !== null),
      switchMap(() => this.getProjects()),
      map((projects) => tasksActions.fetchProjects({ projects }))
    )
  );

  private getUser() {
    return this.store.select(authUserSelector).pipe(first());
  }

  private getSelectedBoard() {
    return this.store.select(tasksSelectedBoardSelector).pipe(first());
  }

  private getBoards(user) {
    return this.getListByPath(`${CollectionKeys.Users}/${user.id}/boards`);
  }

  private getProjects() {
    return this.getSelectedBoard().pipe(
      switchMap(
        (board) =>
          this.getListByPath(
            `${CollectionKeys.Boards}/${board.id}`
          ) as Observable<Project[]>
      )
    );
  }

  private getListByPath(collectionPath) {
    return this.db.list(collectionPath).valueChanges().pipe(first());
  }
}
