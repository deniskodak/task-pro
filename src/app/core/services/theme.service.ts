import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { THEMES, ThemeKeys } from 'src/app/shared/config/theme.config';

const THEME_LOCAL_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currTheme$ = new BehaviorSubject<ThemeKeys>(
    (localStorage.getItem(THEME_LOCAL_KEY) as ThemeKeys) || ThemeKeys.Dark
  );

  constructor(@Inject(DOCUMENT) private document: Document) {}

  init() {
    this.currTheme$.pipe(distinctUntilChanged()).subscribe((theme) => {
      localStorage.setItem(THEME_LOCAL_KEY, theme);
      this.applyTheme(theme);
    });
  }

  setTheme(theme: ThemeKeys) {
    this.currTheme$.next(theme);
  }

  applyTheme(theme: ThemeKeys) {
    const themeObj = THEMES[theme];
    Object.keys(themeObj).forEach((key) => {
      this.document.documentElement.style.setProperty(
        `--${key}`,
        themeObj[key]
      );
    });
  }
}
