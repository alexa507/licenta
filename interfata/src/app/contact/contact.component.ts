import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MesajDTO } from '../DTOs/mesaj.dto';
import { ContactService } from '../servicii/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent implements OnInit {

  nume: any;
  prenume: any;
  email: any;
  mesaj: any;

  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit(): void {
  }

  trimite() {
    if(!this.email || !this.mesaj) {
      this.messageService.add({severity: 'warn', detail: 'Va rog sa completati email-ul si mesajul dumneavoastra.'});
    } else {
      let mesaj = {} as MesajDTO;
      mesaj.email = this.email;
      mesaj.mesaj = this.mesaj;
      mesaj.nume = this.nume;
      mesaj.prenume = this.prenume;
      this.contactService.salveazaMesaj(mesaj).subscribe(data => {
        this.email = undefined;
        this.nume = undefined;
        this.prenume = undefined;
        this.mesaj = undefined;
        this.messageService.add({severity: 'succes', detail: 'Mesajul a fost trimis cu succes. Va multumim!'});
      }, error => {
        this.messageService.add({severity: 'error', detail: 'Mesajul nu a putut fi trimis, va rugam incercati mai tarziu.'})
      });
    }
  }
}
