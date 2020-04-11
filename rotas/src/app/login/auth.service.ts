import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AuthService {
  private usuarioAutenticado  :boolean = false;
  private CanEdit          :boolean = false;

  mostrarMenu = new EventEmitter<boolean>();

  constructor(private _router: Router) { }

  fazerlogin(_usuario: Usuario ){

    if (_usuario.nome === 'eduefl' && 
        _usuario.senha ==='123456'){

          this.usuarioAutenticado = true;
          this.CanEdit = false;

          this.mostrarMenu.emit(true);

          this._router.navigate(['/']);





        }
        else if(_usuario.nome === 'admin' && 
        _usuario.senha ==='admin') {
          this.usuarioAutenticado = true;
          this.CanEdit = true;
          

          this.mostrarMenu.emit(true);

          this._router.navigate(['/']);



        }
        else
        {
            this.usuarioAutenticado = false;          
            this.CanEdit = false;    
            this.mostrarMenu.emit(false);
            
        }
  }

  Getusuarioautenticado(){
    return this.usuarioAutenticado;

  }

  GetCanEdito(){
    return this.CanEdit;

  }

}
