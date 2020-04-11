import { FormsModule } from '@angular/forms';
import { AlunosService } from './alunos.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRouttingModule } from './alunos.routing.module';
import { AlunosDeactivateGuard } from './../guards/alunos.deactivate.guard';
import { AlunoDetalheTeamResolver } from './guards/aluno-detalhe.resolver';
 

@NgModule({
    declarations: [AlunosComponent, AlunoFormComponent, AlunoDetalheComponent],
    imports: [ CommonModule, AlunosRouttingModule, FormsModule ],
    exports: [],
    providers: [AlunosService, AlunosDeactivateGuard,AlunoDetalheTeamResolver],
})
export class AlunosModule {} 