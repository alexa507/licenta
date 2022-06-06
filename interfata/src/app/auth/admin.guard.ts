import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import { StocareTokenService } from '../servicii/stocare-token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private tokenService: StocareTokenService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.tokenService.getToken() == null) {
            console.log("User-ul nu este autentificat")
            return this.router.navigate(['/autentificare']);
        }
        if(this.tokenService.getToken() && this.tokenService.getUser().roluri.contains('admin')) {
            return true;
        } else {
            console.log("User-ul nu este autorizat")
            return this.router.navigate(['/neautorizat']);
        }
  }
}