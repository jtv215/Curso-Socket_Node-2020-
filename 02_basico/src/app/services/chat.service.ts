import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public _wsService: WebSocketService) {
  }


  sendMessage(mensaje: string) {

    const payload= {
      de:this._wsService.getUsuario().nombre,
      cuerpo: mensaje
    };
    
    this._wsService.emit('mensaje',payload);

  }


  getMessage(){

    return this._wsService.listen('mensaje-nuevo');
  }

  getMessagePrivate(){

    return this._wsService.listen('mensaje-privado');
  }

  getUsuariosActivos(){

    return this._wsService.listen('usuarios-activos');
  }

  obtenertUsuarios(){
    console.log('obtener usuarios llamando a la api');
    
    return this._wsService.emit('obtenerUsuarios');
  }


}
