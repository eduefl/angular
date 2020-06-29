import { AlertModalService } from './alert-modal.service';
import { HttpClient } from '@angular/common/http';
import { delay, tap, take, switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
export class CrudService<T> {

constructor(protected htpp: HttpClient,
  protected API_URL,
  protected alertModalService: AlertModalService,
  protected modal: AlertModalService,
  protected router: Router,


) { }


list() {
  console.log(this.API_URL);
  return this.htpp.get<T[]>(this.API_URL)
    .pipe(
      delay(1000),
      tap(console.log)
    );

}

loadById(id) {
  // example template literals
  // return this.htpp.get(this.API_URL.concat('/').concat(id)).pipe(take(1));
  console.log('esse ta sobre escrito nao faz nada');
  return this.htpp.get<T>(`${this.API_URL}/${id}`).pipe(take(1));



}

private create(record) {
  return this.htpp.post(this.API_URL, record).pipe(take(1));
}

private update(record) {
  return this.htpp.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
}

private praVala(id: number) {
  return this.htpp.delete(`${this.API_URL}/${id}`).pipe(take(1));
}


private execOper(record, cOper) {
  console.log(cOper);

  if (cOper === 'novo') {
    return this.create(record);

  } else if (cOper === 'editar') {
    return this.update(record);

  } else if (cOper === 'delete') {
    return this.praVala(record.id);

  } else {
    throw new Error('Operacao nao encotrada');
  }



}
private salvenoChk(record, cOper) {
  return this.execOper(record, cOper);

}



salve(record, cOper, msgSuccess, msgErro, lConfir = false , ModMsg?: string, ModTitle?: string, modBtnOk?: string, modBtnCanc?: string,
  backdrop?: boolean, ignoreBackdropClick?: boolean ) {
  let $slvPrcd: Observable<Object>;
  if (lConfir) {
    $slvPrcd = this.ChkAndsalve(record, cOper, ModMsg, ModTitle, modBtnOk, modBtnCanc, backdrop, ignoreBackdropClick);

  } else {
    $slvPrcd = this.salvenoChk(record, cOper);

  }

  $slvPrcd.subscribe(
    () => this.sucessage(msgSuccess),
    erro => this.paniNoSistema(erro, msgErro),
    () => console.log('Request Finalizada')
  );



}


private ChkAndsalve(record, cOper, ModMsg, ModTitle, modBtnOk, modBtnCanc, backdrop, ignoreBackdropClick) {
  const result$ = this.alertModalService.showConfirm(ModMsg, ModTitle, modBtnOk, modBtnCanc, backdrop, ignoreBackdropClick);

  return result$.asObservable().
    pipe(
      take(1),
      switchMap(result => result ? this.execOper(record, cOper) : EMPTY)
    );

}


private sucessage(msgSuccess) {
  this.modal.showAllertSuccess(msgSuccess);
  this.router.navigate(['/']);

}

private paniNoSistema(erro, msgErro) {
  this.modal.showAllertDanger(msgErro);
  console.log(erro);
}








}
