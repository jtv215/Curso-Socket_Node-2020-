import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public _wbService:WebSocketService){}

  ngOnInit(): void {
  }

  
}
