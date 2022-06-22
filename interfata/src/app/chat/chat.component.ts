import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { ChatMessageDTO } from '../DTOs/chatMessage.dto';
import { ChatService } from '../servicii/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  form: any = {};
  messages: any[] = [];
  message: string = '';
  username: any = '';
  numeIntrodus: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
   //setare cont Pusher pentru a primi mesaje
    const pusher = new Pusher('016cecd0a709158028dd', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('licenta-alexandra-ionila');
    channel.bind('chat-message', (data: ChatMessageDTO)  => {
      this.messages.push(data);
    });
  }

  sendMessage(): void {
    let chatMessage = {} as ChatMessageDTO;
    chatMessage.username = this.username;
    chatMessage.message = this.form.message;
    this.chatService.trimiteMesaj(chatMessage).subscribe(data => {
      this.form.message = '';
    });
  }

  ok() {
    this.numeIntrodus = true;
  }
}
