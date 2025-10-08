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

    // For now, we're not using token-based auth, so just pass through the request
    // In a real application, you might want to implement proper token handling
    return next.handle(req);
  }
}