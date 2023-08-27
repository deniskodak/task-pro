import { Router, RouterModule } from '@angular/router';
import { LogoComponent } from './../../shared/logo/logo.component';
import { LinearComponent } from './../../core/layouts/linear/linear.component';
import { Component } from '@angular/core';
import { AppRoutes } from 'src/app/routes';

@Component({
  standalone: true,
  imports: [LinearComponent, LogoComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  onSignup() {
    this.router.navigate(['/', AppRoutes.Auth, AppRoutes.Signup]);
  }

  onLogin() {
    this.router.navigate(['/', AppRoutes.Auth, AppRoutes.Login]);
  }
}
