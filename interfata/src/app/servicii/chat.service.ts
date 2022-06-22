import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessageDTO } from '../DTOs/chatMessage.dto';
import { StocareTokenService } from './stocare-token.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  URL = '/api/chat';

  constructor(private httpClient: HttpClient, private tokenService: StocareTokenService) { }

  trimiteMesaj(mesaj: ChatMessageDTO) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.post<any>(this.URL , mesaj, httpOptions);
  }
}
