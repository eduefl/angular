import { tap } from 'rxjs/operators';
import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poc-async',
  template: `
  <app-poc-base
    [nome] = "nome"
    [valor] = "valor$ | async"
    estilo = "bg-success"
  >
  </app-poc-base>
`,
  styles: []
})
export class PocAsyncComponent implements OnInit, OnDestroy {
  nome = 'Componente com async';
  // valor: string ;
  valor$: Observable <string> ;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.valor$ = this.service.getValor()
    .pipe(
      tap(v => alert(this.nome + ' valor ' + v))
    ) ;
  }

  ngOnDestroy() {
    console.log(this.nome, 'foi destruido' );
    alert(this.nome + ' foi destruido');


  }

}
