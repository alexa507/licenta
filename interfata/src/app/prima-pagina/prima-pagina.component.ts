import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prima-pagina',
  templateUrl: './prima-pagina.component.html',
  styleUrls: ['./prima-pagina.component.css']
})
export class PrimaPaginaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToInregistrare() {
    this.router.navigate(["/inregistrare"]);
  }
}
