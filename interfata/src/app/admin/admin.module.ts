import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentreComponent } from './centre/centre.component';
import { PrimaPaginaAdminComponent } from './prima-pagina-admin/prima-pagina-admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWTInterceptor } from '../auth/jwt.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { AdaugaEditeazaCentruComponent } from './adauga-editeaza-centru/adauga-editeaza-centru.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    CentreComponent,
    PrimaPaginaAdminComponent,
    UserManagementComponent,
    AdaugaEditeazaCentruComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    CardModule,
    ToastModule,
    ChipsModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    AccordionModule,
    TableModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ],
  providers: [JWTInterceptor]
})
export class AdminModule { }
