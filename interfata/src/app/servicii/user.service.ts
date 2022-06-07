import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  URL = '/api/auth/'
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
}
