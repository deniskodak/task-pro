import { ColumnsItemComponent } from './columns-item/columns-item.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { AddColumnComponent } from './addColumn/add-column.component';
import { Project } from './../../../../core/models/project.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  tasksProjectsSelector,
} from 'src/app/core/store/tasks/tasks.selectors';

@Component({
  standalone: true,
  imports: [AddColumnComponent, NgFor, AsyncPipe, ColumnsItemComponent],
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsListComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.projects$ = this.store.select(tasksProjectsSelector);
  }
}
