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

@Component({
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName = '';
  destroy$ = new Subject<void>();
  constructor(
    private store: Store,
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
