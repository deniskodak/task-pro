import { MatRadioModule } from '@angular/material/radio';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export enum Themes {
  Pink = 'pink',
  Green = 'green',
  Blue = 'blue',
  Gray = 'gray',
}

@Component({
  standalone: true,
  imports: [MatRadioModule],
  selector: 'app-radio-button',
  template: `<mat-radio-button
    [class]="['radio', theme]"
    [value]="value"
  ></mat-radio-button>`,
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent {
  @Input() theme: Themes = Themes.Gray;
  @Input() value = null;
}
