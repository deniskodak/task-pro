import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export enum BoardIcons {
  Project = 'project',
  Star = 'star',
  Loading = 'loading',
  Puzzle = 'puzzle',
  Container = 'container',
  Lightning = 'lightning',
  Colors = 'colors',
  Hexagon = 'hexagon',
}

export const boardIconList = [
  BoardIcons.Project,
  BoardIcons.Star,
  BoardIcons.Loading,
  BoardIcons.Puzzle,
  BoardIcons.Container,
  BoardIcons.Lightning,
  BoardIcons.Colors,
  BoardIcons.Hexagon,
];

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer
  ) {
    boardIconList.forEach((icon) => {
      this.addPath(icon, `assets/icons/${icon}.svg`);
    });
  }

  add(name: string, source: string): void {
    void this.iconRegistry.addSvgIconLiteral(
      name,
      this.sanitizer.bypassSecurityTrustHtml(source)
    );
  }

  addPath(name: string, path: string): void {
    void this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(path)
    );
  }
}
