import { ChatService } from './../../services/chat.service';
import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  mensajeSubcription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(public _chatService: ChatService) {
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensaje')
    this.mensajeSubcription = this._chatService.getMessage().subscribe(msg => {
      console.log('escuchando');

      console.log(msg);
      this.mensajes.push(msg);

      //para bajar el scroll
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });


  }

  enviar() {
    if(this.texto.trim().length==0){
      return;
    }

    this._chatService.sendMessage(this.texto);
    this.texto = '';
  }

  ngOnDestroy() {
    this.mensajeSubcription.unsubscribe();
  }

}
