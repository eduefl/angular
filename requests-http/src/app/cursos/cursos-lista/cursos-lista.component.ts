import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

 // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  constructor(private cursoService: CursosService) { }

  ngOnInit() {
   // this.cursoService.list()
   // .subscribe(resultado => this.cursos = resultado);
   this.cursos$ = this.cursoService.list();
  }

}
