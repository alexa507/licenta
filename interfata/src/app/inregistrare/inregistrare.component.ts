import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../servicii/user.service';

@Component({
  selector: 'app-inregistrare',
  templateUrl: './inregistrare.component.html',
  styleUrls: ['./inregistrare.component.css'],
  providers: [MessageService]
})
export class InregistrareComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;


  constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(!this.form.username || !this.form.email || !this.form.nume || !this.form.prenume || !this.form.parola) {
      this.messageService.add({severity: 'warn', summary: '', detail: 'Va rugam sa completati toate campurile.'});
    } else {
      this.userService.inregistrare(this.form).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.messageService.add({severity: 'succes', detail: 'Inregistrarea a fost facuta cu succes.'});
        },
        err => {
          this.isSignUpFailed = true;
          console.log(err);
          if(err.error.message == 'Eroare: Username-ul este deja folosit!') {
            this.messageService.add({severity: 'error', summary: 'Inregistrare esuata', detail: 'Username-ul este deja folosit.'});
          } else if (err.error.message == 'Eroare: Email-ul este deja folosit!') {
            this.messageService.add({severity: 'error', summary: 'Inregistrare esuata', detail: 'Email-ul este deja folosit.'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Inregistrare esuata', detail: 'Va rugam incercati mai tarziu.'});
          }
        }
      );
    }    
  }

  goToAutentificare() {
    this.router.navigate(['/autentificare']);
  }
}
