import { ChatService } from './services/chat.service';
import { WebSocketService } from './services/web-socket.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basico';

  constructor(
    public _wbService: WebSocketService,
    public _ChatService: ChatService
  ) {

  }

  ngOnInit(): void {

    this._ChatService.getMessagePrivate().subscribe(
      resp => {
        console.log('estoy en appcomponent');
        
        console.log(resp);
        
      })

  }






}
