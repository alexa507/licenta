import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  title = 'licenta-alexandra-ionila-interfata';

  primaPagina() {
    this.router.navigate(['/prima-pagina']);
    sessionStorage.removeItem('centruPtEdit');
  }

  admin() {
    this.router.navigate(['/admin/prima-pagina']);
  }
}
