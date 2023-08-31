import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { slideIn } from '../animations/slidein.animation';

@Component({
  standalone: true,
  imports: [NgIf],
  selector: 'app-input-feedback',
  template: ` <ng-content></ng-content>
    <span
      *ngIf="isShown"
      [@slideIn]="isShown ? 'active' : 'inactive'"
      class="feedback"
      >{{ feedback }}</span
    >`,
  styles: [
    'span {color: var(--gl-error-cl); display: inline-block; margin-top: 0.5rem}',
  ],
  animations: [slideIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFeedbackComponent {
  @Input() feedback = '';
  @Input() isShown = false;
}
