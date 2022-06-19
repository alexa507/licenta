import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Mesaj } from 'src/app/entities/mesaj';
import { ContactService } from 'src/app/servicii/contact.service';

@Component({
  selector: 'app-prima-pagina-admin',
  templateUrl: './prima-pagina-admin.component.html',
  styleUrls: ['./prima-pagina-admin.component.css'],
  providers: [MessageService]
})
export class PrimaPaginaAdminComponent implements OnInit {

  mesaje: Mesaj[] = [];
  incarcat: boolean = false;
  existaMesaje: boolean = false;

  constructor(private router: Router, private contactService: ContactService, 
    private messageService: MessageService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.contactService.getMesaje().subscribe(data => {
      this.mesaje = data;
      if(this.mesaje.length > 0) {
        this.existaMesaje = true;
      }
      this.incarcat = true;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Eroare', detail: 'Eroare la incarcarea mesajelor.' });
    });
  }

  centre() {
    this.router.navigate(['/admin/mentenanta-centre']);
  }

  useri() {
    this.router.navigate(['/admin/user-management']);
  }
}
