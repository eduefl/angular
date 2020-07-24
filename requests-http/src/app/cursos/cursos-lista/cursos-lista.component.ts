import { Cursos2Service } from './../cursos2.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { Observable, empty, EMPTY, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  // bsmodalRef: BsModalRef;

  deletebsmodalRef: BsModalRef;
  @ViewChild('deleteModal', { static: false }) deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  selectedCourse: Curso;

  constructor(private cursoService: Cursos2Service,
    private modalService: BsModalService,
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
    this.router.navigate(['view', id], { relativeTo: this.route });
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });


  }
  onDelete(id) {
    this.router.navigate(['delete', id], { relativeTo: this.route });

  }
  /*/efetivadelDelete(curso) {
    this.selectedCourse = curso;
    // this.deletebsmodalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ = this.alertModalService.showConfirm();
    result$.asObservable().
      pipe(
        take(1),
        switchMap(result => result ? this.cursoService.praVala(curso.id) : EMPTY)
      ).subscribe(success => {
        this.onRefresh();
        this.alertModalService.showAllertSuccess('Removido com sucesso');

      },
        erro => {
          this.alertModalService.showAllertDanger('Erro ao remover curso tente novamente mais tarde');

        }
      );
  }
/*/
/*/
  onConfirmDelete() {
    this.deletebsmodalRef.hide();
    this.cursoService.praVala(this.selectedCourse.id).subscribe(
      success => {
        this.onRefresh();
        this.alertModalService.showAllertSuccess('Removido com sucesso');

      },
      erro => {
        this.alertModalService.showAllertDanger('Erro ao remover curso tente novamente mais tarde');

      }

    );
    //  this.deletebsmodalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }
/*/
  onDeclineDelete() {
    this.deletebsmodalRef.hide();
  }


}

