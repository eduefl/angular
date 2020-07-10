import { take, switchMap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { AlertModalService } from './../shared/alert-modal.service';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { CrudService } from './../shared/crud-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected htpp: HttpClient,
    protected alertModalService: AlertModalService,
    protected modal: AlertModalService,
    protected router: Router,
      ) {

    super(htpp, `${environment.API}cursos`, alertModalService, modal, router);
  }

  loadById(id) {
    // so um exemplo de sobreposicao porque sim
    console.log('ta voltando esse metodo e nao o outroz');
    return this.htpp.get<Curso>(`${this.API_URL}/${id}`).pipe(take(1));



  }







}
