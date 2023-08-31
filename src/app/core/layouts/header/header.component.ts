import { SidebarService } from './../../services/sidebar.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { LayoutService } from 'src/app/core/services/layout.service';
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
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, BurgerComponent, NgIf, AsyncPipe],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName = '';
  layoutType$!: Observable<string>;
  readonly breakpoints = Breakpoints;
  destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private layoutService: LayoutService,
    private sidebarService: SidebarService,
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

    this.layoutType$ = this.layoutService.layoutType$.pipe(
      takeUntil(this.destroy$)
    );
  }

  onOpenSidebar() {
    this.sidebarService.show();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
