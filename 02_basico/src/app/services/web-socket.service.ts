import { Usuario } from './../model/usuario';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socketStatus = false;
  public usuario :Usuario= null;

  constructor(
    private socket: Socket,
    public _router:Router
    ) {
    this.checkStatus();
    this.cargarStorage();

  }


  checkStatus() {
    this.socket.on('connect', () => {
      // console.log('conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();

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


  loginWS(nombre){

    return new Promise((resolve, reject)=>{

      this.emit('configurar-usuario',{nombre}, (resp)=>{     
        this.usuario = new Usuario(null);
        this.usuario.nombre= nombre;       
        
        this.guardarStorage();
        
        resolve();
      });

    })
  }


  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario))
  }

  cargarStorage(){
     
    if(localStorage.getItem('usuario')){

      this.usuario=JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre)
      
    }
  }

  getUsuario(){
    return this.usuario;
  }

  logoutWS(){
    this.usuario= null;
    localStorage.removeItem('usuario');

    const payload={
      nombre: 'sin-nombre'
    }
    this.emit('configurar-usuario',payload,()=>{});
    this._router.navigate(['/']);
  }

}
