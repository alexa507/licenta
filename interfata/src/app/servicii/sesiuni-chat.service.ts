import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SesiuneChatDTO } from '../DTOs/sesiuneChat.dto';
import { StocareTokenService } from './stocare-token.service';

@Injectable({
  providedIn: 'root'
})
export class SesiuniChatService {

  URL = '/api/sesiuniChat/';

  constructor(private httpClient: HttpClient, private tokenService: StocareTokenService) { }

  salveazaSesiuneChat(sesiune: SesiuneChatDTO) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.post<any>(this.URL , sesiune, httpOptions);
  }

  getSesiuniActive() {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.get<any[]>(this.URL + 'active', httpOptions);
  }

  dezactiveazaSesiune(id: string) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.patch<any>(this.URL + id, httpOptions);
  }
}