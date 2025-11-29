import { animation, style, animate } from '@angular/animations';

export const slideIn = animation([
  style({ transform: 'translateX({{offsetStart}})', opacity: 0 }),
  animate('300ms ease-out', style({
    transform: 'translateX(0)',
    opacity: 1
  }))
]);

export const slideOut = animation([
  animate('300ms ease-in', style({
    transform: 'translateX({{offsetEnd}})',
    opacity: 0
  }))
]);
