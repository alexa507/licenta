import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RezervareDTO } from '../DTOs/rezervare.dto';
import { StocareTokenService } from './stocare-token.service';

@Injectable({
  providedIn: 'root'
})
export class RezervariService {
  URL = '/api/rezervari/';

  constructor(private httpClient: HttpClient, private tokenService: StocareTokenService) { }

  salveazaRezervate(rezervare: RezervareDTO) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.post<any>(this.URL , rezervare, httpOptions);
  }
}
