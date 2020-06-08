import { tap } from 'rxjs/operators';
import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base
    [nome] = "nome"
    [valor] = "valor"
    estilo = "bg-danger"
    >
    </app-poc-base>
  `,
  styles: []
})
export class PocComponent implements OnInit, OnDestroy {
  nome = 'componente sem unsubscrible';
  valor: string ;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.service.getValor()
    .pipe(
      tap(v => alert(this.nome + ' valor ' + v))
    )
    .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(this.nome, 'foi destruido' );
    alert(this.nome + ' foi destruido');


  }

}
