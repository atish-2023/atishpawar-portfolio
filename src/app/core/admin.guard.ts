import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if user is authenticated and is admin
    return this.authService.isAdmin$?.pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          // Redirect to login page if not admin
          this.router.navigate(['/admin/login']);
          return false;
        }
      }),
      catchError(() => {
        // If there's an error, redirect to login
        this.router.navigate(['/admin/login']);
        return of(false);
      })
    ) || of(false);
  }
}