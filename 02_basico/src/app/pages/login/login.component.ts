import { Subscription } from 'rxjs';
import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';


  constructor(
    public _webSocketService:WebSocketService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  ingresar() {
    this._webSocketService.loginWS(this.nombre)
    .then (()=>{
      
      this._router.navigate(['/mensajes']);
    });

  }

}
