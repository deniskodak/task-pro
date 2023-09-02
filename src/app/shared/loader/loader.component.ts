import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export enum LoaderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

@Component({
  standalone: true,
  selector: 'app-loader',
  template: `<span [class]="['loader', size, type]"></span>`,
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() size: LoaderSize = LoaderSize.Medium;
  @Input() type: '' | 'reversed' = ''; 
}
