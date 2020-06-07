import { environment } from './../../environments/environment';
import { Curso } from './curso';
import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API_CURSOS = `${environment.API}cursos`;

  constructor(private htpp: HttpClient) { }
  list() {
    return this.htpp.get<Curso[]>(this.API_CURSOS)
    .pipe(
      tap(console.log)
    );

  }
}
