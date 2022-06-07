import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StocareTokenService } from '../servicii/stocare-token.service';
import { UserService } from '../servicii/user.service';

@Component({
  selector: 'app-autentificare',
  templateUrl: './autentificare.component.html',
  styleUrls: ['./autentificare.component.css']
})
export class AutentificareComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private tokenService: StocareTokenService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roluri;
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
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  navigareLaAdmin() {
    this.router.navigate(['/admin/pagina-principala']);
  }
}
