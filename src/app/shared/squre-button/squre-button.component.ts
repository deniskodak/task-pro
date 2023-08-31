import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-square-button',
  template: '<button [class]="theme" (click)="click.emit()"></button>',
  styleUrls: ['./square-button.component.scss'],
})
export class SquareButtonComponent {
  @Input() theme: 'light' | 'dark' = 'light';
  @Output() click = new EventEmitter();
}
