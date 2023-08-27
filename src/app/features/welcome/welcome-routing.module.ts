import { WelcomeComponent } from './../../features/welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { publicGuard } from 'src/app/core/guards/auth.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [publicGuard], 
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
