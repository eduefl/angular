import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { Observable, empty, EMPTY, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

 // cursos: Curso[];
 cursos$: Observable<Curso[]>;
 error$ = new Subject <boolean>();

  constructor(private cursoService: CursosService) { }

  ngOnInit() {
   // this.cursoService.list()
   // .subscribe(resultado => this.cursos = resultado);
   this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursoService.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return EMPTY;
      })
    );
  // example how to use with subscrible
  /*/this.cursoService.list().subscribe(
    dados => {
      console.log(dados) ; // Sucesso
    },
    error => {
       console.error(); // Erro
    },
     () => {
      console.log('Observable completo');  // Observable completo
    });/*/
  // example how to use with subscrible and pipe
/*/    this.cursoService.list()
    .pipe(
      map()
      tap()
      switchMap()
      catchError(error => EMPTY)
    )
    .subscribe(
    dados => {
      console.log(dados) ; // Sucesso
    },
    error => {
       console.error(); // Erro
    },
     () => {
      console.log('Observable completo');  // Observable completo
    });/*/


  }

}
