import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentreComponent } from './centre/centre.component';
import { PrimaPaginaAdminComponent } from './prima-pagina-admin/prima-pagina-admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CentreComponent,
    PrimaPaginaAdminComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
