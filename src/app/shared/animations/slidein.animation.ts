import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideIn = trigger('slideIn', [
  transition('void => *', [
    animate(
      '0.1s',
      keyframes([
        style({
          transform: 'translateY(-100%) scaleY(2.5) scaleX(0.2)',
          transformOrigin: '50% 0%',
          filter: 'blur(40px)',
          opacity: 0,
        }),
        style({
          transform: 'translateY(0) scaleY(1) scaleX(1)',
          transformOrigin: '50% 50%',
          filter: 'blur(0)',
          opacity: 1,
        }),
      ])
    ),
  ]),
]);
