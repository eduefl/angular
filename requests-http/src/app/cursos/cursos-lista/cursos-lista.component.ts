import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
 bsmodalRef: BsModalRef;
 cursos$: Observable<Curso[]>;
 error$ = new Subject <boolean>();
 config = {
  backdrop: true,
  ignoreBackdropClick: true
};

  constructor(private cursoService: CursosService, private modalService: BsModalService) { }

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
        this.handleError();
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

  handleError() {
    this.bsmodalRef = this.modalService.show(AlertModalComponent, this.config);
    this.bsmodalRef.content.type = 'danger';
    this.bsmodalRef.content.message = 'erro ao carregar os dados';



  }

}

