import { Injectable } from '@angular/core';
import { WebSocketService } from './../services/web-socket.service';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UsuarioGuardService implements CanActivate {


  constructor(
    public _wsService: WebSocketService,
    private _router:Router

  ) { }


  canActivate(): boolean {
    if (this._wsService.getUsuario()) {
      return true;
    } else {
      this._router.navigate(['/'])
      return false;
    }

  }

}
