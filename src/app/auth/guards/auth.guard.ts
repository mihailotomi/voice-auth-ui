import { inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { User } from '../models/user';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map((user) => {
      if (user) {
        const { roles } = route.data;

        if (checkUserRole(router, roles, user)) {
          return true;
        } else {
          // User is logged in, but doesn't have permission - redirect to home
          router.navigate(['/']);
          return false;
        }
      } else {
        // User is not authenticated, redirect to login
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
const checkUserRole = (router: Router, roles: any, user: User): boolean => {
  if (roles && !roles.includes(user.role)) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
