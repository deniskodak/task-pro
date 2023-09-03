import { tasksActions } from 'src/app/core/store/tasks/tasks.actions';
import { CREATE_TASK_KEY } from 'src/app/features/home/create-task-modal/create-task-modal.component';
import { ModalService } from './../../../../../../core/services/modal.service';
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

  constructor(private store: Store, private modalService: ModalService) {}

  ngOnInit(): void {
    this.cardList$ = this.store.select(tasksTasksSelector(this.projectId));
  }

  onEditTask(task: Task) {
    this.modalService.setModalOptions({
      key: CREATE_TASK_KEY,
      task,
      projectId: this.projectId,
    });
  }

  onDeleteTask(task: Task) {
    this.store.dispatch(
      tasksActions.deleteTask({ projectId: this.projectId, task: task })
    );
  }
}
