import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import {
  Input,
  Output,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [NgFor, AsyncPipe, MatIconModule],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemComponent implements OnInit {
  @Input() card: Task;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
