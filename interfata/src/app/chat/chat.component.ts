import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Pusher from 'pusher-js';
import { ChatMessageDTO } from '../DTOs/chatMessage.dto';
import { SesiuneChatDTO } from '../DTOs/sesiuneChat.dto';
import { ChatService } from '../servicii/chat.service';
import { SesiuniChatService } from '../servicii/sesiuni-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [MessageService]
})
export class ChatComponent implements OnInit {

  form: any = {};
  messages: any[] = [];
  message: string = '';
  username: any = '';
  userAutentificat: boolean = false;
  canal: any;

  //pt user autentificat
  chatUser: any;
  sesiuneCreata: any;
  listaSesiuniActive: any[] = [];

  //pt user normal
  numeIntrodus: boolean = false;
  sesiunePtClient: any;
  nuExistaSesiuni: boolean = false;
  conversatieIncheiata: boolean = false;


  constructor(private chatService: ChatService, private sesiuniService: SesiuniChatService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    //verifica daca este user autentificat si creaza sesiune de chat
    let chatUserString = sessionStorage.getItem('chatUser');
    console.log(chatUserString);
    if (chatUserString != null && chatUserString != '') {
      this.userAutentificat = true;
      this.chatUser = JSON.parse(chatUserString);
      console.log(this.chatUser);
      this.username = this.chatUser.prenume + ' ' + this.chatUser.nume;
      //se salveaza o sesiune in DB si folosim ID-ul acesteia ca si canal de comunicare pentru Pusher
      this.incepeSesiuneNoua();
      // cazul in care este un user normal      
    } else {
      //recuperam lista de sesiuni active
      this.sesiuniService.getSesiuniActive().subscribe(data => {
        this.listaSesiuniActive = data;
        //verificam daca exista sesiuni active
        if (this.listaSesiuniActive == null || this.listaSesiuniActive.length == 0) {
          this.nuExistaSesiuni = true;
        } else {
          //alegem prima sesiune
          this.sesiunePtClient = this.listaSesiuniActive[0];
          //dezactivam sesiunea pentru a nu putea fi folosita si de alt user normal
          this.dezactiveazaSesiune(this.sesiunePtClient);
          this.canal = this.sesiunePtClient.id.toString();
          //setare Pusher pentru a primi mesaje
          const pusher = new Pusher('016cecd0a709158028dd', {
            cluster: 'eu'
          });
          const channel = pusher.subscribe(this.canal);
          channel.bind('chat-message', (data: ChatMessageDTO) => {
            this.messages.push(data);
            if(data.message === 'Conversativa dumneavoastra s-a incheiat.') {
              this.conversatieIncheiata = true;
            }
          });
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Eroare', detail: 'Sesiunile de chat nu au putut fi recuperare.' })
      });
    }

  }

  sendMessage(): void {
    let chatMessage = {} as ChatMessageDTO;
    chatMessage.username = this.username;
    chatMessage.message = this.form.message;
    chatMessage.canal = this.canal;
    this.chatService.trimiteMesaj(chatMessage).subscribe(data => {
      this.form.message = '';
    });
  }

  incepeSesiuneNoua() {
    let sesiune = {} as SesiuneChatDTO;
    sesiune.nume = this.chatUser.nume;
    sesiune.prenume = this.chatUser.prenume;
    sesiune.username = this.chatUser.username;
    this.sesiuniService.salveazaSesiuneChat(sesiune).subscribe(data => {
      this.sesiuneCreata = data;
      const pusher = new Pusher('016cecd0a709158028dd', {
        cluster: 'eu'
      });
      this.canal = this.sesiuneCreata.id.toString();
      //setare Pusher pentru a primi mesaje
      const channel = pusher.subscribe(this.canal);
      channel.bind('chat-message', (data: ChatMessageDTO) => {
        this.messages.push(data);
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Eroare', detail: 'Sesiunea de chat nu a putut fi creata.' })
      console.log(this.sesiuneCreata);
    });
  }

  dezactiveazaSesiune(sesiune: any) {
    this.sesiuniService.dezactiveazaSesiune(sesiune.id).subscribe(data => {
      console.log('sesiunea a fost dezactivata');
    }, error => {
      console.log('eroare la dezactivarea sesiunii');
    });
  }


  converstatieIncheiata() {
    this.dezactiveazaSesiune(this.sesiuneCreata);
    this.incepeSesiuneNoua();
    //trimite mesaj pentru a atentiona userul neautentificat ca s-a incheiat converstatia
    let chatMessage = {} as ChatMessageDTO;
    chatMessage.username = 'Atentie!';
    chatMessage.message = 'Conversativa dumneavoastra s-a incheiat.';
    chatMessage.canal = this.canal;
    this.chatService.trimiteMesaj(chatMessage).subscribe(data => {
      this.form.message = '';
      this.messages = [];
    });
  }

  deconectare() {
    let chatMessage = {} as ChatMessageDTO;
    chatMessage.username = 'Atentie!';
    chatMessage.message = 'Conversativa dumneavoastra s-a incheiat.';
    chatMessage.canal = this.canal;
    this.chatService.trimiteMesaj(chatMessage).subscribe(data => {
      this.form.message = '';
      this.messages = [];
    });
    this.dezactiveazaSesiune(this.sesiuneCreata);
    this.inapoi();
  }

  ok() {
    this.numeIntrodus = true;
  }

  inapoi() {
    this.router.navigate(['/prima-pagina']);
  }
}
