import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { authSelectors } from 'src/app/root-store';
import { first, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<{}>
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(authSelectors.selectToken).pipe(
      first(),
      switchMap(token => {
        
        if (token) {

          const headers = request.headers.set('Authorization', `Bearer ${token}`).append('Content-Type', 'application/json');

          const tokenReq = request.clone({
            headers
          });

          return next.handle(tokenReq);
        }

        return next.handle(request);
      })
    )
  }
}
