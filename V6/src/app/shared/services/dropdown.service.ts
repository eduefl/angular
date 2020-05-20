import { EstadoBr } from './../models/estado-br';
// import { Http, Response } from '@angular/http'; // used before Angular V6
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estados.json');
  }
  getcargos() {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senhor', desc: 'Dev Sr'}
    ];
  }

  gettecnologias() {
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'advpl', desc: 'Protheus'},
      {nome: 'php', desc: 'Php'},
      {nome: 'vb6', desc: 'Visual Basic 6'}
    ];
  }



}
