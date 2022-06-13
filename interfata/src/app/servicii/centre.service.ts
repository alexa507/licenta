import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CentruDTO } from '../DTOs/centru.dto';
import { StocareTokenService } from './stocare-token.service';

@Injectable({
  providedIn: 'root'
})
export class CentreService {
  URL = '/api/centre/';

  constructor(private httpClient: HttpClient, private tokenService: StocareTokenService) { }

  salveazaCentru(centru: CentruDTO) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.post(this.URL , centru, httpOptions);
  }
}
