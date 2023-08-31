import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearComponent {}
