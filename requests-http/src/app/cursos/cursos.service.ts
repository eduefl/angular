import { environment } from './../../environments/environment';
import { Curso } from './curso';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API_CURSOS = `${environment.API}cursos`;

  constructor(private htpp: HttpClient) { }
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

  salve(curso, cOper) {
    if (cOper === 'novo') {
      return this.create(curso);

    } else if (cOper === 'editar') {
      return this.update(curso);

    }


  }




}
