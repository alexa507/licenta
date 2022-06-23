import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../DTOs/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  URL = '/api/auth/';
  URL_USERS = '/api/users/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  autentificare(credentiale: any): Observable<any> {
    return this.httpClient.post(this.URL + 'autentificare', credentiale, this.httpOptions);
  }

  inregistrare(user: any) {
    return this.httpClient.post(this.URL + 'inregistrare', user, this.httpOptions)
  }

  getUseri() {
    return this.httpClient.get<any[]>(this.URL_USERS + 'all', this.httpOptions);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(this.URL_USERS + id, this.httpOptions);
  }

  editeazaUser(id: number, user: UserDTO) {
    return this.httpClient.patch(this.URL_USERS + id, user, this.httpOptions);
  }
}
