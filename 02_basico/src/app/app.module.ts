import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';



//sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent,
    LoginComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
