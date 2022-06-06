import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaPaginaComponent } from './prima-pagina/prima-pagina.component';
import { AutentificareComponent } from './autentificare/autentificare.component';
import { InregistrareComponent } from './inregistrare/inregistrare.component';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { JWTInterceptor } from './auth/jwt.interceptor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PrimaPaginaComponent,
    AutentificareComponent,
    InregistrareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    HttpClientModule
  ],
  providers: [JWTInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
