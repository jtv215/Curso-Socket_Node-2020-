import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socketStatus = false;

  constructor(
    private socket: Socket,
    public _router:Router
    ) {
    this.checkStatus();

  }


  checkStatus() {
    this.socket.on('connect', () => {
      // console.log('conectado al servidor');
      this.socketStatus = true;

    });


    this.socket.on('disconnect', () => {
      // console.log('Desconectado del servidor');
      this.socketStatus = false;

    });
  }

  emit(evento: string, payload?: any, callback?: Function) { 
    this.socket.emit(evento, payload, callback);
  }

  listen(evento:string){
    return this.socket.fromEvent(evento);
  }



}
