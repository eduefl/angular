import { tap, take } from 'rxjs/operators';
import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-poc-take',
  template: `
  <app-poc-base
    [nome] = "nome"
    [valor] = "valor"
    estilo = "bg-info"
  >
  `,
  styles: []
})
export class PocTakeComponent implements OnInit, OnDestroy {
  nome = 'Componente com take';
  valor: string ;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.service.getValor()
    .pipe(
      tap(v => alert(this.nome + ' valor ' + v)),
      take(1)
    )
    .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(this.nome, 'foi destruido' );
    alert(this.nome + ' foi destruido');


  }

}
