import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { SessionUserService } from '../core/services/sessionUser/session-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionUserService: SessionUserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const { routeConfig } = route;

    const { path } = routeConfig as Route;

    if (path?.includes('auth') || path === '') {
      if (this.sessionUserService.isLogged$()) {
        this.sessionUserService.logout();
      }
      return true;
    }

    return this.sessionUserService.isLogged$().pipe(
      take(1),
      map(isLogged => {
        if (isLogged) {
          return true;
        }
        return this.router.createUrlTree(['']);
      })
    );
  }

}
