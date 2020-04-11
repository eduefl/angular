import { Observable } from 'rxjs/rx';
import { RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";
import { IFormCanDeactvate } from './../alunos/guards/iform-candeactivate';

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactvate> {
        canDeactivate(
            component: IFormCanDeactvate,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {
            console.log('guarda de desativacao');            
        //     return component.canExit();

        return component.podeDesativar();
    }
}
