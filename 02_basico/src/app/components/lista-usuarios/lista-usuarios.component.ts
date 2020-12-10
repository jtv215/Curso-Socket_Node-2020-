import { async } from '@angular/core/testing';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs;

  constructor(
    public ChatService:ChatService
  ) { }

  ngOnInit(): void {
   

    this.ChatService.getUsuariosActivos().subscribe(
      resp => {       
       this.usuariosActivosObs=resp;
        console.log(resp);
        
      })

      this.ChatService.obtenertUsuarios();
        
    

  }

}
