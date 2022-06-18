import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CentruDTO } from '../DTOs/centru.dto';
import { Centru } from '../entities/centru';
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

  getCentre() {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.get<Centru[]>(this.URL + 'all', httpOptions);
  }

  deleteCentru(id: number) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    console.log(id);
    return this.httpClient.delete(this.URL + 'sterge/'+ id.toString() , httpOptions)
  }

  editeazaCentru(centru: CentruDTO, id: number) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.patch(this.URL + id, centru , httpOptions);
  }

  rezervaLocuriInCentru(idCentru: number, numarLocuri: number) {
    const token = this.tokenService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + token})
    }
    return this.httpClient.patch(this.URL + 'ocupaLocuri/' + idCentru + '/' + numarLocuri, httpOptions);
  }
}
