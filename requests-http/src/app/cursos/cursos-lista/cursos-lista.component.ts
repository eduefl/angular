import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
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
 // bsmodalRef: BsModalRef;
 cursos$: Observable<Curso[]>;
 error$ = new Subject <boolean>();
 config = {
  backdrop: true,
  ignoreBackdropClick: true
  };

  constructor(private cursoService: CursosService,
//    private modalService: BsModalService) { }
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

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
    this.alertModalService.showAllertDanger('erro ao carregar os dados');

    /*/
    this.bsmodalRef = this.modalService.show(AlertModalComponent, this.config);
    this.bsmodalRef.content.type = 'danger';
    this.bsmodalRef.content.message = 'erro ao carregar os dados';
    /*/

  }

  viewReg(id) {
    this.router.navigate(['view', id], {relativeTo: this.route});
  }

  onEdit(id) {
    this.router.navigate(['editar', id], {relativeTo: this.route});


  }

}

