import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit } from '@angular/core';

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
export class PocUnsubComponent implements OnInit {
  nome = 'Componente com unsubscrible';
  valor: string ;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
  }

}
