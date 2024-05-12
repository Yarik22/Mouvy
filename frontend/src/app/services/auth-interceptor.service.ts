import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('inter');
    if (this.shouldDecodeToken(request.url)) {
      const token = this.authService.getToken();
      if (token) {
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(clonedRequest);
      }
    }
    return next.handle(request);
  }

  private shouldDecodeToken(url: string): boolean {
    // Define routes/pages where token decoding is required
    const protectedRoutes = ['/home', '/main'];
    return protectedRoutes.some((route) => url.includes(route));
  }
}
