import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
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
      return true;
    }

    if (this.sessionUserService.isLogged) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}
