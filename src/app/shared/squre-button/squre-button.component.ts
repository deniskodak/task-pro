import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-square-button',
  template: '<button [class]="[theme, size]" (click)="click.emit()"></button>',
  styleUrls: ['./square-button.component.scss'],
})
export class SquareButtonComponent {
  @Input() theme: '' | 'reversed' | 'colored' = '';
  @Input() size: 'medium' | 'large' = 'medium';
  @Output() click = new EventEmitter();
}
