import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  routeURL: string = ""

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.routeURL = state.url;
      let user_type = sessionStorage.getItem("user_type")
      if (user_type == null) {
        this.routeURL = '/login-page';
        this.router.navigate([this.routeURL]).then(r => {
        })
        return resolve(false);
      }

      this.routeURL = this.router.url;
      return resolve(true);

    })
  }
}
