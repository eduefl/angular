import { tap, takeUntil } from 'rxjs/operators';
import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-poc-take-until',
  template: `
  <app-poc-base
    [nome] = "nome"
    [valor] = "valor"
    estilo = "bg-primary"
  >
  </app-poc-base>
  `,
  styles: []
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {
  nome = 'Componente com take until';
  valor: string ;

  usnub$ = new Subject();

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.service.getValor()
    .pipe(
      tap(v => alert(this.nome + ' valor ' + v)),
      takeUntil(this.usnub$) 
    )
    .subscribe(novoValor => this.valor = novoValor);

  }

  ngOnDestroy() {
    this.usnub$.next();
    this.usnub$.complete();
    console.log(this.nome, 'foi destruido' );
    alert(this.nome + ' foi destruido');


  }

}
