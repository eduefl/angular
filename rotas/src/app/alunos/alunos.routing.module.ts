import { AlunosGuard } from './../guards/alunos.guard';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosComponent } from './alunos.component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AlunosDeactivateGuard } from './../guards/alunos.deactivate.guard';

import { AlunoDetalheTeamResolver } from './guards/aluno-detalhe.resolver';


const alunosRoutes=[
    {path: '', component: AlunosComponent,
    canActivateChild: [AlunosGuard],
     children: [
        {path: 'novo', component: AlunoFormComponent},    
        {path: ':id', component: AlunoDetalheComponent,
            resolve: { aluno : AlunoDetalheTeamResolver}
        
        },
        {path: ':id/editar', component: AlunoFormComponent,
            canDeactivate: [AlunosDeactivateGuard]
        }
    
    ] }
    

];


@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(alunosRoutes) ],
    exports: [RouterModule],
    providers: [],
})

export class AlunosRouttingModule{
     
}