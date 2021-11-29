import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { authSelectors } from 'src/app/root-store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<{}>
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIsLoggedIn();
  }

  checkIsLoggedIn(): Observable<boolean> {

    return this.store.select(authSelectors.selectIsLoggedIn).pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }),
      take(1)
    )
  }
}
