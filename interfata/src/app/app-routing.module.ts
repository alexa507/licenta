import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdaugaEditeazaCentruComponent } from './admin/adauga-editeaza-centru/adauga-editeaza-centru.component';
import { CentreComponent } from './admin/centre/centre.component';
import { PrimaPaginaAdminComponent } from './admin/prima-pagina-admin/prima-pagina-admin.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AutentificareComponent } from './autentificare/autentificare.component';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { InregistrareComponent } from './inregistrare/inregistrare.component';
import { PrimaPaginaComponent } from './prima-pagina/prima-pagina.component';

const routes: Routes = [
  { path: 'prima-pagina', component: PrimaPaginaComponent },
  { path: 'autentificare', component: AutentificareComponent },
  { path: 'inregistrare', component: InregistrareComponent },
  {
    path: 'admin',
    children: [
      { path: 'mentenanta-centre', component: CentreComponent, canActivate: [UserGuard] },
      { path: 'prima-pagina', component: PrimaPaginaAdminComponent, canActivate: [UserGuard] },
      { path: 'adauga-editeaza-centru', component: AdaugaEditeazaCentruComponent, canActivate: [UserGuard] },
      { path: 'user-management', component: UserManagementComponent, canActivate: [AdminGuard] }
    ]
  },
  { path: '', redirectTo: '/prima-pagina', pathMatch: 'full' },
  { path: '**', redirectTo: '/prima-pagina', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
