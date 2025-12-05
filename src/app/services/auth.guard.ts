import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
     private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isAuthenticated();

    // Get the route path (e.g. 'login', 'homepage', etc.)
    const path = route.routeConfig?.path;

    if (isLoggedIn) {
      // ✅ If user is logged in, prevent going to login or homepage
      if (path === 'login' || path === 'homepage') {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true; // allow other routes (dashboard, profile, etc.)
    } else {
      // ❌ If user is not logged in, allow only login or homepage
      if (path === 'login' || path === 'homepage') {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
  }
}
