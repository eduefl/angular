import { AuthService } from './../login/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/rx';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AlunosGuard implements CanActivateChild {

    usercanedit: boolean = false;

    constructor(private _authService : AuthService){


  
  
    }
  
    	canActivateChild(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable <boolean>|Promise<boolean>|boolean {

            if (state.url.includes('editar') && !this._authService.GetCanEdito()  ){
                alert('nao pode editar');
                return Observable.of(false);
            }
            console.log('guarda de rota aluno');
            return true;
        }

        
}

