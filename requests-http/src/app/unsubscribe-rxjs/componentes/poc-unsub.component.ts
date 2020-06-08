import { tap } from 'rxjs/operators';
import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poc-unsub',
  template: `
  <app-poc-base
    [nome] = "nome"
    [valor] = "valor"
    estilo = "bg-secondary"
  >
  `,
  styles: []
})
export class PocUnsubComponent implements OnInit, OnDestroy {
  nome = 'Componente com unsubscrible';
  valor: string ;

 // sub: Subscription;
  sub: Subscription[] = []; // to work with several subscriptions

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.sub.push( this.service.getValor()
    .pipe(
      tap(v => alert(this.nome + ' valor ' + v))
    )
    .subscribe(novoValor => this.valor = novoValor));
  }

  ngOnDestroy() {
    this.sub.forEach(s=> s.unsubscribe());
    console.log(this.nome, 'foi destruido' );
    alert(this.nome + ' foi destruido');


  }

}
