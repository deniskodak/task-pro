import { IconService } from '../../core/services/icon.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const burgerSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

@Component({
  standalone: true,
  selector: 'app-burger',
  imports: [MatIconModule],
  template: `<span class="burger" (click)="click.emit()">
    <mat-icon
      svgIcon="burger"
      aria-hidden="false"
      aria-label="burger-menu"
    ></mat-icon>
  </span>`,
  styleUrls: ['./burger.component.scss'],
})
export class BurgerComponent {
  @Output() click = new EventEmitter();

  constructor(private iconService: IconService) {
    this.iconService.add('burger', burgerSvg);
  }
}
