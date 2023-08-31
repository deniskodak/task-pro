import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export enum SpriteIcons {
  Project = 'icon-Project',
  Colors = 'icon-colors',
  Loading = 'icon-loading',
  Puzzle = 'icon-puzzle',
  Lightning = 'icon-lightning',
  Star = 'icon-star',
  Hexagon = 'icon-hexagon',
  Container = 'icon-container',
}

@Component({
  standalone: true,
  selector: 'svg-icon',
  styleUrls: ['./svg-icon.component.scss'],
  template: `
    <svg>
      <use attr.xlink:href="/assets/icons/sprite.svg#{{ icon }}"></use>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input() icon: string;
}
