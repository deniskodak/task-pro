import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  isShown$ = new Subject<boolean>();

  show() {
    this.isShown$.next(true);
  }

  hide() {
    this.isShown$.next(false);
  }
}
