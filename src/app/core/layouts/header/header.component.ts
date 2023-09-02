import { ThemeService } from './../../services/theme.service';
import { ThemeKeys } from './../../../shared/config/theme.config';
import { SidebarService } from './../../services/sidebar.service';
import { NgIf, AsyncPipe, NgFor, NgClass } from '@angular/common';
import { LayoutService, Breakpoints } from 'src/app/core/services/layout.service';
import { authUserSelector } from './../../store/auth/auth.selectors';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { BurgerComponent } from 'src/app/shared/burger/burger.component';

@Component({
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    BurgerComponent,
    NgIf,
    AsyncPipe,
    NgFor,
    NgClass,
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName = '';
  layoutType$!: Observable<string>;
  themes = [ThemeKeys.Light, ThemeKeys.Dark, ThemeKeys.Violet];
  readonly breakpoints = Breakpoints;
  destroy$ = new Subject<void>();
  currTheme$: Observable<ThemeKeys>;

  constructor(
    private store: Store,
    private layoutService: LayoutService,
    private sidebarService: SidebarService,
    private themeService: ThemeService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store
      .select(authUserSelector)
      .pipe(
        map((user) => user.name),
        takeUntil(this.destroy$)
      )
      .subscribe((name) => {
        this.userName = name;
      });

    this.currTheme$ = this.themeService.currTheme$;
    this.layoutType$ = this.layoutService.layoutType$.pipe(
      takeUntil(this.destroy$)
    );
  }

  onOpenSidebar() {
    this.sidebarService.show();
  }

  onThemeClick(theme: ThemeKeys) {
    this.themeService.setTheme(theme);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
