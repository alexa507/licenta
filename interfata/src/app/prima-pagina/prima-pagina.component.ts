import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatAdapter } from 'ng-chat';


@Component({
  selector: 'app-prima-pagina',
  templateUrl: './prima-pagina.component.html',
  styleUrls: ['./prima-pagina.component.css']
})
export class PrimaPaginaComponent implements OnInit {

  public adapter: ChatAdapter = {} as ChatAdapter;
  public userId = 999;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToInregistrare() {
    this.router.navigate(["/inregistrare"]);
  }

  goToAdmin() {
    this.router.navigate(["/admin/prima-pagina"]);
  }

  goToAdminCentre() {
    this.router.navigate(["/admin/mentenanta-centre"]);
  }

  goToAdminUserManagement() {
    this.router.navigate(["/admin/user-management"]);
  }

  goToLogin() {
    this.router.navigate(["/autentificare"]);
  }

  goToCautaCentre() {
    this.router.navigate(['/centre']);
  }

  goToQuiz() {
    this.router.navigate(['/formular']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }
}
