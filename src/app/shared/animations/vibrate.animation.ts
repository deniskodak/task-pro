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
