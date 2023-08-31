import { DatabaseUser } from './../../models/database-user.model';
import { authUserSelector } from './../auth/auth.selectors';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { tasksActions } from './tasks.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of, Observable } from 'rxjs';
import { Board } from '../../models/board.model';

enum CollectionKeys {
  Users = '/users',
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
  deleteBoard = createEffect(() =>
    this.actions$.pipe(
      ofType(tasksActions.deleteBoard),
      switchMap((action) =>
        this.getUser().pipe(
          switchMap((user) =>
            this.getBoards(user).pipe(
              switchMap((boards: Board[]) => {
                const key = (boards || []).findIndex(
                  (board) => board.id === action.id
                );

                return key !== -1
                  ? this.db
                      .list(`${CollectionKeys.Users}/${user.id}/boards`)
                      .remove(String(key))
                      .then(() => tasksActions.fetchBoardsStart())
                      .catch(() => ({ type: 'invalid' }))
                  : of(tasksActions.fetchBoardsStart());
              })
            )
          )
        )
      )
    )
  );

  private getUser() {
    return this.store.select(authUserSelector);
  }

  private getBoards(user) {
    return this.db
      .list(`${CollectionKeys.Users}/${user.id}/boards`)
      .valueChanges()
      .pipe(take(1));
  }
}
