import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {


  getcursos(){

    return [
      {id: 1, nome: 'angular2'},
      {id: 2, nome: 'java'},      
  ]; 
  }

  getCurso(id: number){
    let cursos = this.getcursos();
    for (let i=0; i<cursos.length; i++ ){
      let curso = cursos[i];
      if (curso.id == id){
        return curso;
      }
    }
    return null;
  }

  constructor() { }

}
