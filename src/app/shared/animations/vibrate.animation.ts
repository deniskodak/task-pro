import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export enum VibrateStates {
  Inactive = 'inactive',
  Active = 'active',
}

export class VibrateClass {
  vibrateState = VibrateStates.Inactive;

  toggleVibrate() {
    if (this.vibrateState === VibrateStates.Active) return;

    this.vibrateState = VibrateStates.Active;
    setTimeout(() => {
      this.vibrateState = VibrateStates.Inactive;
    }, 300);
  }
}

export const vibrate = [
  trigger('vibrateAnimation', [
    state(
      'active',
      style({
        transform: 'translate(0)',
      })
    ),
    state(
      'inactive',
      style({
        transform: 'translate(0)',
      })
    ),
    transition('inactive <=> active', [
      animate(
        '0.3s',
        keyframes([
          style({ transform: 'translate(0)' }),
          style({ transform: 'translate(-2px, 2px)' }),
          style({ transform: 'translate(-2px, -2px)' }),
          style({ transform: 'translate(2px, 2px)' }),
          style({ transform: 'translate(2px, -2px)' }),
          style({ transform: 'translate(0)' }),
        ])
      ),
    ]),
  ]),
];
