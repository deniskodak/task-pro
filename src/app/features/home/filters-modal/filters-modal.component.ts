import { Observable } from 'rxjs';
import { tasksActions } from 'src/app/core/store/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe } from '@angular/common';
import { RadioComponent } from './../../../shared/radio-group/radio.component';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  priorityList,
  THEMES_PRIORITY_MAP,
  TaskPriority,
  PRIORITY_LABEL_MAP,
} from 'src/app/shared/constants/priority';
import { Filter } from 'src/app/core/store/tasks/tasks.reducers';
import { tasksProjectFilterSelector } from 'src/app/core/store/tasks/tasks.selectors';

export const FILTERS_KEY = 'filters';

@Component({
  standalone: true,
  imports: [
    ModalComponent,
    MatRadioModule,
    RadioComponent,
    NgFor,
    FormsModule,
    AsyncPipe,
  ],
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersModalComponent implements OnInit {
  priorityList = priorityList;
  selectedFilter$: Observable<Filter>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedFilter$ = this.store.select(tasksProjectFilterSelector);
  }

  getRadioTheme(priority: TaskPriority) {
    return THEMES_PRIORITY_MAP[priority];
  }

  getPriorityLabel(priority: TaskPriority) {
    return PRIORITY_LABEL_MAP[priority];
  }

  onRadioChange(event: MatRadioChange) {
    this.store.dispatch(tasksActions.setProjectFilter({ filter: event.value }));
  }

  onClickAll() {
    this.store.dispatch(tasksActions.setProjectFilter({ filter: 'all' }));
  }

  changeRadio(priority: Filter) {
    this.store.dispatch(tasksActions.setProjectFilter({ filter: priority }));
  }
}
