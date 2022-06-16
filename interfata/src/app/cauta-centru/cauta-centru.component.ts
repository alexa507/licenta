import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Centru } from '../entities/centru';
import { CentreService } from '../servicii/centre.service';

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

  constructor(private serviceCentre: CentreService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCentre();

  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.userLong = position.coords.longitude;
        this.userLat = position.coords.latitude;
        this.harta = {
          center: { lat: this.userLat, lng: this.userLong },
          zoom: 12
        };
        this.incarcat = true;
        console.log(this.harta);
      });
    } else {
      console.log("No support for geolocation");
      this.harta = {
        center: { lat: this.latSum / this.centreHarta.length, lng: this.lngSum / this.centreHarta.length },
        zoom: 12
      };
      this.incarcat = true;
    }
  }

  getCentre() {
    this.serviceCentre.getCentre().subscribe(data => {
      this.centre = data;
      console.log(this.centre);
      this.centre.forEach(centru => {
        var marker = new google.maps.Marker({
          position: { lat: centru.latitudine, lng: centru.longitudine }, title: centru.nume + "   ",
          animation: google.maps.Animation.DROP,
          dropOffPoint: centru
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
      this.getLocation();
      
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Eroare', detail: 'Eroare la preluarea centrelor.' })
    })
  }

  zoomIn(map: any) {
    map.setZoom(map.getZoom() + 1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom() - 1);
  }

  handleOverlayClick(event: any) {
    for (let marker of this.centreHarta) {
      if (marker.animation != null) {
        marker.setAnimation(null);
      }
    }
    event.overlay.addListener('click', function () {
      if (event.overlay.getAnimation() !== null) {
        event.overlay.setAnimation(null);
      } else {
        event.overlay.setAnimation(google.maps.Animation.BOUNCE);
      }
    });
    this.centruSelectat = event.overlay;
    console.log(this.centruSelectat);
  }
}
