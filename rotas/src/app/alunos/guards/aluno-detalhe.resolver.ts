import { AlunosService } from './../alunos.service';
import { Aluno } from './../aluno';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable()
export class AlunoDetalheTeamResolver implements Resolve<Aluno> {
    constructor(private _alunosService: AlunosService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any { 
            let id = route.params['id'];
            return  this._alunosService.getaluno(id);
    }
}
