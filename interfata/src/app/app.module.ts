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
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CautaCentruComponent } from './cauta-centru/cauta-centru.component';
import { GMapModule } from 'primeng/gmap';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { QuizComponent } from './quiz/quiz.component';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';
import { NeautorizatComponent } from './neautorizat/neautorizat.component';


@NgModule({
  declarations: [
    AppComponent,
    PrimaPaginaComponent,
    AutentificareComponent,
    InregistrareComponent,
    CautaCentruComponent,
    QuizComponent,
    ContactComponent,
    ChatComponent,
    NeautorizatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    HttpClientModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    CardModule,
    ToastModule,
    GMapModule,
    ProgressSpinnerModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    InputNumberModule,
    DialogModule,
    InputTextareaModule
  ],
  providers: [JWTInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
