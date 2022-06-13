import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prima-pagina-admin',
  templateUrl: './prima-pagina-admin.component.html',
  styleUrls: ['./prima-pagina-admin.component.css']
})
export class PrimaPaginaAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  centre() {
    this.router.navigate(['/admin/mentenanta-centre']);
  }

  useri() {
    this.router.navigate(['/admin/user-management']);
  }
}
