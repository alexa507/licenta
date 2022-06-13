import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CentruDTO } from 'src/app/DTOs/centru.dto';
import { CentreService } from 'src/app/servicii/centre.service';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.css'],
  providers: [MessageService]
})
export class CentreComponent implements OnInit {

  nume: string = '';
  adresa: string = '';
  oras: string = '';
  telefon: string = '';
  email: string = '';
  utilitati: string[] = [];
  nrLocuriMax: any = null;
  nrLocuriLibere: any = null;
  latitudine: any = null;
  longitudine: any = null;

  constructor(private service: CentreService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  salveazaCentru() {
    if(this.nume == '' || this.adresa == '' || this.oras == '' || this.telefon == ''
    || this.email == '' || this.utilitati.length == 0 || !this.nrLocuriLibere ||
    !this.nrLocuriMax || !this.latitudine || !this.longitudine) {
      this.messageService.add({ severity: 'warn', summary: '', detail: "Va rog completati toate campurile."});
    } else {
      let centru = {} as CentruDTO;
      centru.adresa = this.adresa;
      centru.email = this.email;
      centru.latitudine = this.latitudine;
      centru.longitudine = this.longitudine;
      centru.nrLocuriLibere = this.nrLocuriLibere;
      centru.nrLocuriMax = this.nrLocuriMax;
      centru.nume = this.nume;
      centru.oras = this.oras;
      centru.telefon = this.telefon;
      centru.utilitati = this.utilitati;
      this.service.salveazaCentru(centru).subscribe(data => {
        console.log(data);
        this.messageService.add({ severity: 'succes', summary: '', detail: "Centrul a fost salvat cu succes."});
      })
    }
  }
}
