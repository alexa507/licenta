import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Centru } from 'src/app/entities/centru';
import { CentreService } from 'src/app/servicii/centre.service';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CentreComponent implements OnInit {


  listCentre: Centru[] = [];

  constructor(private service: CentreService, private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllCentre();
    sessionStorage.removeItem('centruPtEdit');
  }

  getAllCentre() {
    this.service.getCentre().subscribe(data => {
      this.listCentre = data;
    });
  }

  deleteCentru(centru: Centru) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this portal?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.deleteCentru(centru.id).subscribe(data => {
          console.log(data);
          this.getAllCentre();
          this.messageService.add({ severity: 'succes', summary: '', detail: "Centrul a fost sters cu succes." });
        }, error => {
          this.messageService.add({ severity: 'succes', summary: '', detail: "Eroare la stergerea centrului." });
        });
      },
      reject: () => {}    
        });
  };

  editeazaCentru(centru: Centru) {
    sessionStorage.setItem('centruPtEdit', JSON.stringify(centru));
    this.router.navigate(['/admin/adauga-editeaza-centru']);
  }

  adaugaCentru() {
    this.router.navigate(['/admin/adauga-editeaza-centru']);
  }
}
