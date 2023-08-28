import { HeaderComponent } from './../../core/layouts/header/header.component';
import { AsyncPipe, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
import { Observable, tap } from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet, AsyncPipe, HeaderComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly breakpoints = Breakpoints;

  layoutType$!: Observable<string>;

  constructor(private readonly layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutType$ = this.layoutService.layoutType$.pipe(tap((type) => console.log(type, 'break')));
  }
}
