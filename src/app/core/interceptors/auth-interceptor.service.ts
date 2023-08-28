import { switchMap } from 'rxjs/operators';
import { authUserSelector } from './../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(authUserSelector).pipe(
      take(1),
      switchMap((user) => {
        const clonedReq = req.clone({});

        if (!user) return next.handle(req);
        clonedReq.params.append('auth', user.token);
        return next.handle(clonedReq);
      })
    );
  }
}
