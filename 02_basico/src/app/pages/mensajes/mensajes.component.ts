import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  public usuario;
  constructor(
    public _wsService: WebSocketService
  ) { }

  ngOnInit(): void {
  }


  salir(){
    this._wsService.logoutWS();
  }
}
