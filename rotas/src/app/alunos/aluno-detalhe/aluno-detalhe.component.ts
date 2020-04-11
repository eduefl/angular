import { Subscription } from 'rxjs/Rx';
import { AlunosService } from './../alunos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../login/auth.service';
import { Aluno } from '../aluno';



@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  aluno: any;
  inscricao: Subscription;
   showbutton : boolean;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _alunosService : AlunosService,
    private _authService : AuthService

  ) { }

  ngOnInit() {
    /*/this.inscricao = this.route.params.subscribe( 
      (paramns: any) => {
        let id = paramns['id']; 

        this.aluno = this._alunosService.getaluno(id);


      }
     );/*/
     this.showbutton = this._authService.GetCanEdito();


     this.inscricao = this.route.data.subscribe (
       (info:{aluno: Aluno}) => {
        this.aluno = info.aluno;
       }
      );
  }

  editarContato(){
    this._router.navigate(['/alunos',this.aluno.id,'editar']);


  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
    
  }

}
