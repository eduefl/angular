import { AlertModalService } from './../shared/alert-modal.service';
import { environment } from './../../environments/environment';
import { Curso } from './curso';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take, switchMap } from 'rxjs/operators';
import { EMPTY, empty, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API_CURSOS = `${environment.API}cursos`;

  constructor(private htpp: HttpClient,
    private alertModalService: AlertModalService,
    private modal: AlertModalService,
    private router: Router,
  ) { }
  list() {
    return this.htpp.get<Curso[]>(this.API_CURSOS)
      .pipe(
        delay(1000),
        tap(console.log)
      );

  }

  loadById(id) {
    // example template literals
    // return this.htpp.get(this.API_CURSOS.concat('/').concat(id)).pipe(take(1));
    return this.htpp.get<Curso>(`${this.API_CURSOS}/${id}`).pipe(take(1));



  }

  private create(curso) {
    return this.htpp.post(this.API_CURSOS, curso).pipe(take(1));
  }

  private update(curso) {
    return this.htpp.put(`${this.API_CURSOS}/${curso.id}`, curso).pipe(take(1));
  }

  private praVala(id: number) {
    return this.htpp.delete(`${this.API_CURSOS}/${id}`).pipe(take(1));
  }

  salve(curso, cOper, msgSuccess, msgErro, lConfir = false , ModMsg?: string, ModTitle?: string, modBtnOk?: string, modBtnCanc?: string,
    backdrop?: boolean, ignoreBackdropClick?: boolean ) {
    let $slvPrcd: Observable<Object>;
    if (lConfir) {
      $slvPrcd = this.ChkAndsalve(curso, cOper, ModMsg, ModTitle, modBtnOk, modBtnCanc, backdrop, ignoreBackdropClick);

    } else {
      $slvPrcd = this.salvenoChk(curso, cOper);

    }

    $slvPrcd.subscribe(
      () => this.sucessage(msgSuccess),
      erro => this.paniNoSistema(erro, msgErro),
      () => console.log('Request Finalizada')
    );



  }


  private ChkAndsalve(curso, cOper, ModMsg, ModTitle, modBtnOk, modBtnCanc, backdrop, ignoreBackdropClick) {
    const result$ = this.alertModalService.showConfirm(ModMsg, ModTitle, modBtnOk, modBtnCanc, backdrop, ignoreBackdropClick);

    return result$.asObservable().
      pipe(
        take(1),
        switchMap(result => result ? this.execOper(curso, cOper) : EMPTY)
      );

  }

  private salvenoChk(curso, cOper) {
    return this.execOper(curso, cOper);

  }

  private sucessage(msgSuccess) {
    this.modal.showAllertSuccess(msgSuccess);
    this.router.navigate(['/']);

  }

  private paniNoSistema(erro, msgErro) {
    this.modal.showAllertDanger(msgErro);
    console.log(erro);
  }




  private execOper(curso, cOper) {
    console.log(cOper);

    if (cOper === 'novo') {
      return this.create(curso);

    } else if (cOper === 'editar') {
      return this.update(curso);

    } else if (cOper === 'delete') {
      return this.praVala(curso.id);

    } else {
      throw new Error('Operacao nao encotrada');
    }


  }






}
