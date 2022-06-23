import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RezervareDTO } from '../DTOs/rezervare.dto';
import { Centru } from '../entities/centru';
import { CentreService } from '../servicii/centre.service';
import { RezervariService } from '../servicii/rezervari.service';

@Component({
  selector: 'app-cauta-centru',
  templateUrl: './cauta-centru.component.html',
  styleUrls: ['./cauta-centru.component.css'],
  providers: [MessageService]
})
export class CautaCentruComponent implements OnInit {

  harta: any;
  userLong: number = 0;
  userLat: number = 0;
  centreHarta: any[] = [];
  centre: Centru[] = [];
  centruSelectat: any;
  incarcat: boolean = false;
  latSum: number = 0;
  lngSum: number = 0;
  arataDetaliiCentru: boolean = false;
  infoWindow: any;
  orasePtCautare: any[] = [];
  utilitatiPtCautare: any[] = [];
  orasSelectatCautare: any = null;
  nrLocuriLiberCautare: any = null;
  utilitatiSelectateCautare: any[] = [];
  centreFiltrareDupaCautare: Centru[] = [];
  cautareCentreDetaliata: boolean = false;
  faraRezultate: boolean = false;
  showDialogRezervare: boolean = false;
  numeRezervare: any = null;
  prenumeRezervare: any = null;
  nrPersoaneRezervare: any = null;
  mentiuniRezervare: any = null;
  qrCodeContent: any;
  showImage: boolean = false;
  qrSrc: string = '';
  emailRezervare: any = null;
  rezervareCreata: boolean = false;

  constructor(private serviceCentre: CentreService, private messageService: MessageService,
    private rezervariService: RezervariService) { }

  ngOnInit(): void {
    this.getCentre();
    this.infoWindow = new google.maps.InfoWindow();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLong = position.coords.longitude;
        this.userLat = position.coords.latitude;
        this.harta = {
          center: { lat: this.userLat, lng: this.userLong },
          zoom: 12
        };
        this.incarcat = true;
      }, error => {
        this.harta = {
          center: { lat: this.latSum / this.centreHarta.length, lng: this.lngSum / this.centreHarta.length },
          zoom: 7
        };
        this.incarcat = true;
      });
    } else {
      console.log("No support for geolocation");
      this.harta = {
        center: { lat: this.latSum / this.centreHarta.length, lng: this.lngSum / this.centreHarta.length },
        zoom: 7
      };
      this.incarcat = true;
    }
  }

  getCentre() {
    this.serviceCentre.getCentre().subscribe(data => {
      this.centre = data;
      let orase: string[] = [];
      let utilitati: string[] = [];
      this.centre.forEach(centru => {
        //creaza lista de orase unice
        if (!orase.includes(centru.oras.toLowerCase())) {
          orase.push(centru.oras.toLowerCase());
        }

        //creaza lista de utilitati unice
        let utilitatiCentru = centru.utilitati.split(',');
        utilitatiCentru.forEach(uc => {
          if (!utilitati.includes(uc.toLowerCase())) {
            utilitati.push(uc.toLowerCase());
          }
        });
      });
      //creaza lista pentru dropdown ul de oras in cautare avansata
      orase.forEach(oras => {
        this.orasePtCautare.push({ name: oras.toUpperCase(), code: oras });
      });
      //creaza lista pentru dropdown ul de utilitati in cautare avansata
      utilitati.forEach(utilitate => {
        this.utilitatiPtCautare.push({ name: utilitate.toUpperCase(), code: utilitate });
      });
      this.setMarkerePtHarta(this.centre);
      this.getLocation();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Eroare', detail: 'Eroare la preluarea centrelor.', sticky: true });
    })
  }

  setMarkerePtHarta(listaCentre: Centru[]) {
    this.latSum = 0;
    this.lngSum = 0;
    this.centreHarta = [];
    listaCentre.forEach(centru => {
      //creaza lista de markere pentru harta
      var marker = new google.maps.Marker({
        position: { lat: centru.latitudine, lng: centru.longitudine }, title: centru.nume + "   ",
        animation: google.maps.Animation.DROP,
        dropOffPoint: centru,
        visible: true
      } as google.maps.MarkerOptions);
      marker.addListener('click', function () {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      });
      this.centreHarta.push(marker);
      this.latSum = this.latSum + centru.latitudine;
      this.lngSum = this.lngSum + centru.longitudine;
    });
  }

  handleOverlayClick(event: any) {
    for (let marker of this.centreHarta) {
      marker.setAnimation(null);
    }
    event.overlay.addListener('click', function () {
      if (event.overlay.getAnimation() !== null) {
        event.overlay.setAnimation(null);
      } else {
        event.overlay.setAnimation(google.maps.Animation.DROP);
        event.overlay.setAnimation(null);
      }
    });

    this.centruSelectat = event.overlay.dropOffPoint;
    this.infoWindow.setContent('' + this.centruSelectat.nume + '');
    this.infoWindow.open(event.map, event.overlay);
    this.arataDetaliiCentru = true;
  }



  cautareDetaliata(map: any) {
    this.cautareCentreDetaliata = false;
    this.faraRezultate = false;
    this.centreFiltrareDupaCautare = [];
    //verifica daca oras si nr de locuri libere sunt introduse
    if (this.orasSelectatCautare == null || this.nrLocuriLiberCautare == null) {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Alegeti orasul si numarul de locuri necesare.' })
      //verifica daca utilitatile nu sunt selectate si executa cautarea doar cu oras si nr locuri
    } else if (this.utilitatiSelectateCautare.length > 0) {
      this.centre.forEach(centru => {
        let utilitati: string[] = centru.utilitati.split(',');
        let utilitatiSelectate: string[] = [];
        this.utilitatiSelectateCautare.forEach(usc => {
          utilitatiSelectate.push(usc.code);
        });
        let utilitatiCheck = utilitatiSelectate.some(u => utilitati.includes(u));

        if (centru.oras.toLowerCase() == this.orasSelectatCautare.code && centru.nrLocuriLibere > this.nrLocuriLiberCautare && utilitatiCheck) {
          this.centreFiltrareDupaCautare.push(centru);
        }
      });
      if (this.centreFiltrareDupaCautare.length == 0) {
        this.faraRezultate = true;
      } else {
        this.cautareCentreDetaliata = true;
      }
      //executa cautarea cu oras, nr locuri si utilitati
    } else {
      this.centre.forEach(centru => {
        if (centru.oras.toLowerCase() == this.orasSelectatCautare.code && centru.nrLocuriLibere > this.nrLocuriLiberCautare) {
          this.centreFiltrareDupaCautare.push(centru);
        }
      });
      if (this.centreFiltrareDupaCautare.length == 0) {
        this.faraRezultate = true;
      } else {
        this.cautareCentreDetaliata = true;
      }
    }

    if (this.faraRezultate) {
      //verifica daca exista rezultate pentru cautarea executata
      this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Cautare dvs. nu are niciun rezultate. Va rugam incercati alta cautare.' })
    } else {
      this.cautareCentreDetaliata = true;
      //seteaza rezultatele cautarii pe harta si centru hartei
      this.setMarkerePtHarta(this.centreFiltrareDupaCautare);
      this.harta = {
        center: { lat: (this.latSum / this.centreHarta.length), lng: (this.lngSum / this.centreHarta.length) },
        zoom: 13
      };
      map.setCenter(this.harta.center);
      map.setZoom(this.harta.zoom);
    }
  }

  rezerva() {
    this.showDialogRezervare = true;
  }

  rezervaDinTable(centru: Centru) {
    this.centruSelectat = centru;
    this.showDialogRezervare = true;
  }

  inapoiLaCautare() {
    this.arataDetaliiCentru = false;
    this.centruSelectat = undefined;
  }

  creazaRezervare() {
    this.rezervareCreata = false;
    if (this.nrPersoaneRezervare == null || this.nrPersoaneRezervare == undefined
      || this.nrPersoaneRezervare == 0 || this.emailRezervare == null) {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Va rog introduceti numarul de persoane pentru rezervare (minim 1) si email-ul.' });
    } else {
      let rezervare = {} as RezervareDTO;
      rezervare.numarPersoane = this.nrPersoaneRezervare;
      rezervare.mentiuni = this.mentiuniRezervare;
      rezervare.nume = this.numeRezervare;
      rezervare.prenume = this.prenumeRezervare;
      rezervare.idCentru = this.centruSelectat.id;
      rezervare.email = this.emailRezervare;
      this.showDialogRezervare = false;
      this.showImage = true;
      
      this.rezervariService.salveazaRezervate(rezervare).subscribe(data => {
        //seteaza src-ul imaginii pt QR
        this.qrSrc = '../assets/' + data.idRezervare.toString() + '.png';
        this.showDialogRezervare = false;
        
        this.messageService.add({ severity: 'succes', summary: '', detail: 'Rezervarea dvs a fost creata cu succes.' });
        //updateaza centrul in care s-a facut rezervarea pentru a modifica nr de locuri disponibile
        this.serviceCentre.rezervaLocuriInCentru(this.centruSelectat.id, this.nrPersoaneRezervare).subscribe(data => {
          this.arataDetaliiCentru = false;
          this.getCentre();
          this.rezervareCreata = true;
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Eroare', detail: 'Eroare la actualizarea nr de locuri libere al centrului.' });
        });
        //reinitializeaza variabilele
        this.nrPersoaneRezervare = null;
        this.mentiuniRezervare = null;
        this.prenumeRezervare = null;
        this.numeRezervare = null;
        this.emailRezervare = null;
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Eroare', detail: 'Eroare la crearea rezervarii. Va rugam incercati mai tarziu.' });
      });
    }
  }
}
