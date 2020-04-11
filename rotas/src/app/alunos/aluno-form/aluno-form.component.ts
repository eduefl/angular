import { AlunosService } from './../alunos.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { IFormCanDeactvate } from '../guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactvate  {

  aluno: any = {};
  inscricao : Subscription
  private lChangForm : boolean = false;



  constructor(
    private route: ActivatedRoute,
    private _alunosService: AlunosService


  ) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this._alunosService.getaluno(id);

        if (this.aluno == null){
          this.aluno = {};


        }



      }
    )


  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
      
  }

  onInput(){

    this.lChangForm = true;



  }

  canExit(){
    if (this.lChangForm){
      return  confirm('voce realmente deseja sair sem editar ?'); 
    }
    return true;
    


  }

  podeDesativar()
  {

    return this.canExit();


  }

 

}
