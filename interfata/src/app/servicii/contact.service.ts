import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MesajDTO } from '../DTOs/mesaj.dto';
import { Mesaj } from '../entities/mesaj';
import { StocareTokenService } from './stocare-token.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  URL = '/api/mesaje';

  constructor(private httpClient: HttpClient, private tokenService: StocareTokenService) { }

  salveazaMesaj(mesaj: MesajDTO) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.post<any>(this.URL , mesaj, httpOptions);
  }

  getMesaje() {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.get<Mesaj[]>(this.URL, httpOptions);
  }
}
