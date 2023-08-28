import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { authUserSelector } from '../store/auth/auth.selectors';
import { AppRoutes } from 'src/app/routes';

export const publicGuard = () => {
  const storeService = inject(Store);
  const router = inject(Router);
  return storeService.select(authUserSelector).pipe(
    take(1),
    map((user) => {
      return (
        !user?.token ||
        router.createUrlTree(['/', AppRoutes.Home])
      );
    })
  );
};

export const privateGuard = () => {
  const storeService = inject(Store);
  const router = inject(Router);
  return storeService.select(authUserSelector).pipe(
    take(1),
    map((user) => {
      return !!user?.token || router.createUrlTree(['/', AppRoutes.Welcome]);
    })
  );
};
