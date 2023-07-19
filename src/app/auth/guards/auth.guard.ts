import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { map, of, switchMap } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (user) {
          const { roles } = route.data;

          if (this.checkUserRole(roles, user)) {
            return true;
          } else {
            // User is logged in, but doesn't have permission - redirect to home
            this.router.navigate(['/']);
            return false;
          }
        } else {
          // User is not authenticated, redirect to login page with the return URL
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      })
    );
  }
  private checkUserRole(roles: any, user: User): boolean {
    if (roles && !roles.includes(user.role)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
