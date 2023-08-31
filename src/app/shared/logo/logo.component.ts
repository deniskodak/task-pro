import { NgClass } from '@angular/common';
import { IconService } from './../../core/services/icon.service';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const logoSvg = `
<svg width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33142 15.0269C3.57586 13.7553 3.78408 12.4168 4.0783 11.0782C4.22315 10.3777 4.04662 10.0788 3.26353 10.1324C2.48044 10.1859 1.60681 10.1591 0.773932 10.1324C-0.0589508 10.1056 -0.208327 9.68618 0.271486 9.08831C2.63434 6.17034 5.02435 3.28807 7.40531 0.414724C7.67237 0.0890188 7.98018 -0.142991 8.41925 0.102404C8.85832 0.347798 8.76779 0.651196 8.69537 1.01706C8.43283 2.35557 8.21556 3.69409 7.92586 5.00583C7.77648 5.68401 7.97112 5.92495 8.67726 5.89818C9.38596 5.86248 10.096 5.86248 10.8047 5.89818C11.2076 5.89818 11.7372 5.68848 11.9454 6.23727C12.1536 6.78606 11.7146 7.01807 11.4928 7.34378C10.5875 8.45921 9.67008 9.57315 8.74063 10.6856C7.37966 12.3097 6.02924 13.9278 4.68938 15.54C4.42685 15.8567 4.13262 16.1111 3.68449 15.9504C3.23637 15.7898 3.33142 15.4106 3.33142 15.0269Z"/>
</svg>
`;

export enum LogoSizes {
  Default = 'default',
  Small = 'small',
}

@Component({
  standalone: true,
  selector: 'app-logo',
  imports: [MatIconModule, NgClass],
  template: `<span
    class="logo"
    [ngClass]="{
      small: size === logoSizes.Small,
      default: size === logoSizes.Default
    }"
  >
    <mat-icon
      class="logo-icon"
      svgIcon="logo"
      aria-hidden="false"
      aria-label="logo"
    ></mat-icon>
  </span>`,
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  logoSizes = LogoSizes;
  @Input() size: LogoSizes = LogoSizes.Default;

  constructor(private iconService: IconService) {
    this.iconService.add('logo', logoSvg);
  }
}
