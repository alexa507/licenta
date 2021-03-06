import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StocareTokenService } from '../servicii/stocare-token.service';
import { UserService } from '../servicii/user.service';

@Component({
  selector: 'app-autentificare',
  templateUrl: './autentificare.component.html',
  styleUrls: ['./autentificare.component.css'],
  providers: [MessageService]
})
export class AutentificareComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username: string = '';

  constructor(private tokenService: StocareTokenService, private userService: UserService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roluri;
      this.username = this.tokenService.getUser().username;
    }
  }

  onSubmit(): void {
    this.userService.autentificare(this.form).subscribe(data => {
      this.tokenService.saveToken(data.token);
      this.tokenService.saveUser(data);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roluri;
      this.navigareLaAdmin();
    },
      err => {
        this.messageService.add({severity: 'error', summary: 'Autentificare esuata', detail: 'Va rugam verificati username-ul si parola introduse.'})
        this.isLoginFailed = true;
      }
    );
  }

  navigareLaAdmin() {
    this.router.navigate(['/admin/prima-pagina']);
  }

  goToInregistrare() {
    this.router.navigate(['/inregistrare']);
  }
}
