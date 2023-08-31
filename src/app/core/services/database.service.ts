import { switchMap } from 'rxjs/operators';
import { authUserSelector } from './../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { inject, Injectable, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { DatabaseUser } from '../models/database-user.model';

@Injectable()
export class DatabaseUserService {
  private dbPath = '/users/';
  databaseUser: AngularFireObject<DatabaseUser>;

  constructor(private db: AngularFireDatabase, private store: Store) {
    // this.tutorialsRef = db.object() .(this.dbPath);
    this.store.select(authUserSelector).subscribe((user) => {
      this.databaseUser = this.db.object(this.dbPath + user.id);
      console.log(this.db.database);
    });
  }

  //   getAll(): AngularFireList<Tutorial> {
  //     return this.tutorialsRef;
  //   }

  //   create(tutorial: Tutorial): any {
  //     return this.tutorialsRef.push(tutorial);
  //   }

  //   update(key: string, value: any): Promise<void> {
  //     return this.tutorialsRef.update(key, value);
  //   }

  //   delete(key: string): Promise<void> {
  //     return this.tutorialsRef.remove(key);
  //   }

  //   deleteAll(): Promise<void> {
  //     return this.tutorialsRef.remove();
  //   }
}
