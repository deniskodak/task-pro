import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './routes';

const routes: Routes = [
  {
    path: AppRoutes.Welcome,
    loadChildren: () =>
      import('../app/features/welcome/welcome-routing.module').then(
        (module) => module.WelcomeRoutingModule
      ),
  },
  {
    path: AppRoutes.Auth,
    loadChildren: () =>
      import('../app/features/auth/auth-routing.module').then(
        (module) => module.WelcomeRoutingModule
      ),
  },
  {
    path: AppRoutes.Home,
    loadChildren: () =>
      import('../app/features/home/home-routing.module').then(
        (module) => module.HomeRoutingModule
      ),
  },
  {
    path: '**',
    redirectTo: AppRoutes.Welcome,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.Welcome,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
