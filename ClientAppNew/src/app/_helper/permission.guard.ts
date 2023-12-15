import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let roles = route.data["permission"] as Array<string>;
    let access: boolean = false;

    let permission = this.authService.getUserPermissions();
    permission.filter(x => roles.filter(y => {
      if (y == x) {
        access = true
      }
    }));
    if (access) {
      return true
    }
    else {
      alert("Unauthorize access");
      return false;
    }

  }

}
