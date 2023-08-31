import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export enum Breakpoints {
  Handset = '(max-width: 767px)',
  Tablet = '(min-width: 768px) and (max-width: 1279px)',
  Web = '(min-width: 1280px)',
}

export const LAYOUT_SHORT_TYPES_MAP = {
  [Breakpoints.Handset]: '(min-width: 767px)',
  [Breakpoints.Tablet]: '(min-width: 768px)',
  [Breakpoints.Web]: Breakpoints.Web,
};

export const LAYOUT_TYPES = [
  Breakpoints.Handset,
  Breakpoints.Tablet,
  Breakpoints.Web,
];

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly layoutSubject$ = new BehaviorSubject<string>(
    Breakpoints.Handset
  );

  get layoutType$(): Observable<string> {
    return this.layoutSubject$.asObservable();
  }

  get snapshotLayoutType(): string {
    return this.layoutSubject$.value;
  }

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(LAYOUT_TYPES)
      .pipe(
        tap((result) => {
          let type;
          for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
              type = LAYOUT_SHORT_TYPES_MAP[query];
              break;
            }
          }

          this.layoutSubject$.next(type ?? Breakpoints.Handset);
        })
      )
      .subscribe();
  }
}
