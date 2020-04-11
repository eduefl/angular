import { Observable } from 'rxjs/rx';
import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';

import { AuthService } from './../login/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private _authService :AuthService,
  private _router: Router ) { }


  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable <boolean> | boolean { 
      return this.verificarAcesso();
  }

  private verificarAcesso(){
    if (this._authService.Getusuarioautenticado()){
      return true;
    }
  
    this._router.navigate(['/login']);
    return false;
  
   

  }

  	canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
      console.log('canLoad');
      return this.verificarAcesso();
    }

}
