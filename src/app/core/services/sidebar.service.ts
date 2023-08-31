import { Injectable } from '@angular/core';
import { ShowService } from './show.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService extends ShowService {
  constructor(){
    super()
  }
}
