import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StocareTokenService } from '../servicii/stocare-token.service';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private tokenService: StocareTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = req.clone({ setHeaders: {
        Authorization: 'Bearer ' + token
      } });
    }
    return next.handle(authReq);
  }
}


export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
];