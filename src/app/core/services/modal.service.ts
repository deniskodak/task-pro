import { Subject } from 'rxjs';
import { ShowService } from './show.service';
import { Injectable } from '@angular/core';

interface modalOptions {
  key: string;
  [K: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService extends ShowService {
  modalOptions$ = new Subject<modalOptions | null>();

  constructor() {
    super();
  }

  setModalOptions(options: modalOptions) {
    this.modalOptions$.next(options);
  }

  override hide() {
    this.setModalOptions(null);
    this.isShown$.next(false);
  }
}
