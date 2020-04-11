import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { CursosService } from './cursos.service';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  

  cursos : any[];
  pagina : number;
  incricao : Subscription

  constructor(
    private _cursosService: CursosService,
    private route : ActivatedRoute,
    private router: Router  
  ) { }

  ngOnInit() {
    this.cursos = this._cursosService.getcursos();
    this.incricao =   this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.pagina = queryParams['pagina'];
      }
    );
  }

  ngOnDestroy(): void {
    this.incricao.unsubscribe()
    
  }

  proximaPagina(){
    this.pagina++;
    this.router.navigate(['/cursos'],{queryParams: {'pagina':this.pagina}});


  }

}
