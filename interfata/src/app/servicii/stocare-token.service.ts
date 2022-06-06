import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StocareTokenService {

  constructor() { }

  delogare(): void {
    sessionStorage.clear();
  }

  public saveToken(token: string) {
    sessionStorage.removeItem('token');
    sessionStorage.setItem('token', token);
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public saveUser(user: any) {
    sessionStorage.removeItem('user');
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    var stringUser = sessionStorage.getItem('user');
    if (stringUser) {
      return JSON.parse(stringUser);
    }
    return null;
  }
}
