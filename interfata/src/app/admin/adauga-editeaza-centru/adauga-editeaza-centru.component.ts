import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CentruDTO } from 'src/app/DTOs/centru.dto';
import { Centru } from 'src/app/entities/centru';
import { CentreService } from 'src/app/servicii/centre.service';

@Component({
  selector: 'app-adauga-editeaza-centru',
  templateUrl: './adauga-editeaza-centru.component.html',
  styleUrls: ['./adauga-editeaza-centru.component.css'],
  providers: [MessageService]
})
export class AdaugaEditeazaCentruComponent implements OnInit {

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
  editare: boolean = false;
  centruPtEdit: any;

  constructor(private service: CentreService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.centruPtEdit = {} as Centru;
    let centruEditString = sessionStorage.getItem('centruPtEdit');
    if (centruEditString != null) {
      this.centruPtEdit = JSON.parse(centruEditString);
      this.nume = this.centruPtEdit.nume;
      this.adresa = this.centruPtEdit.adresa;
      this.oras = this.centruPtEdit.oras;
      this.telefon = this.centruPtEdit.telefon;
      this.email = this.centruPtEdit.email;
      this.utilitati = this.centruPtEdit.utilitati.split(',');
      this.nrLocuriLibere = this.centruPtEdit.nrLocuriLibere;
      this.nrLocuriMax = this.centruPtEdit.nrLocuriMax;
      this.latitudine = this.centruPtEdit.latitudine;
      this.longitudine = this.centruPtEdit.longitudine;
      this.editare = true;
    }

  }

  salveazaCentru() {
    if (this.nume == '' || this.adresa == '' || this.oras == '' || this.telefon == ''
      || this.email == '' || this.utilitati.length == 0 || !this.nrLocuriLibere ||
      !this.nrLocuriMax || !this.latitudine || !this.longitudine) {
      this.messageService.add({ severity: 'warn', summary: '', detail: "Va rog completati toate campurile." });
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
        this.messageService.add({ severity: 'succes', summary: '', detail: "Centrul a fost salvat cu succes." });
        this.router.navigate(['/admin/mentenanta-centre']);
      }, error => {
        this.messageService.add({ severity: 'error', summary: '', detail: "Eroare in salvarea centrului." });
      })
    }
  }

    editeazaCentru() {
      if (this.nume == '' || this.adresa == '' || this.oras == '' || this.telefon == ''
        || this.email == '' || this.utilitati.length == 0 || !this.nrLocuriLibere ||
        !this.nrLocuriMax || !this.latitudine || !this.longitudine) {
        this.messageService.add({ severity: 'warn', summary: '', detail: "Va rog completati toate campurile." });
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
        this.service.editeazaCentru(centru, this.centruPtEdit.id).subscribe(data => {
          this.messageService.add({ severity: 'succes', summary: '', detail: "Centrul a fost editat cu succes." });
          this.router.navigate(['/admin/mentenanta-centre']);
          sessionStorage.removeItem('centruPtEdit');
        }, error => {
          this.messageService.add({ severity: 'error', summary: '', detail: "Eroare in editarea centrului." });
        })
      }
    }

}
