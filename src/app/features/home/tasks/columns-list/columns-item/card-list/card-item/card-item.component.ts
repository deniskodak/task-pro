import { NgFor, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Input, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemComponent implements OnInit {
  @Input() card: Task;

  constructor(private store: Store) {}

  ngOnInit(): void {
  }
}