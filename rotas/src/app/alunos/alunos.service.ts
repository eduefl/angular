import { Aluno } from './aluno';
import { Injectable } from '@angular/core';

@Injectable()
export class AlunosService {

  private alunos : Aluno[] = [
    {id:1, nome: 'Florisvaldo', email: 'florisvaldo@zorratotal.com'},
    {id:2, nome: 'herbert richard', email: 'gotgaMagica@saoPaulo.com'},
    {id:3, nome: 'jony raso', email: 'maximiliano@gov.com'}
    
  ]
  getalunos(){

    return this.alunos;
  }

  getaluno(id: number){
    for (let index = 0; index < this.alunos.length ; index++) {
      let aluninho = this.alunos[index];
      if (aluninho.id== id ) {
        return aluninho;        
      }      
    }
    return null;

  }
  constructor() { }

}
