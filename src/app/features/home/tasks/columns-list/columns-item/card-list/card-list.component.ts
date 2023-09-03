import { CardItemComponent } from './card-item/card-item.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { tasksTasksSelector } from './../../../../../../core/store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Input,
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, CardItemComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {
  @Input() projectId: string;
  cardList$: Observable<Task[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.cardList$ = this.store.select(tasksTasksSelector(this.projectId));
  }
}
