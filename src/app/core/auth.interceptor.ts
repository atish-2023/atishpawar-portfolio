import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only intercept requests to our API
    if (!req.url.startsWith('/api')) {
      return next.handle(req);
    }

    // Get the auth token
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        // Clone the request and add the authorization header if token exists
        if (token) {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          });
          return next.handle(authReq);
        }
        
        // If no token, proceed with original request
        return next.handle(req);
      })
    );
  }
}