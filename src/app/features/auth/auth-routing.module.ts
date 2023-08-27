import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { publicGuard } from 'src/app/core/guards/auth.service';
import { AppRoutes } from 'src/app/routes';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [publicGuard],
    children: [
      {
        path: AppRoutes.Login,
        component: AuthComponent,
        data: { isLogin: true },
      },
      {
        path: AppRoutes.Signup,
        component: AuthComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.Login,
  },
  {
    path: '**',
    redirectTo: AppRoutes.Login,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
