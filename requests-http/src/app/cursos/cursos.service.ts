import { Curso } from './curso';
import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API_CURSOS = 'http://localhost:3000/cursos';

  constructor(private htpp: HttpClient) { }
  list() {
    return this.htpp.get<Curso[]>(this.API_CURSOS)
    .pipe(
      tap(console.log);
    );

  }
}
