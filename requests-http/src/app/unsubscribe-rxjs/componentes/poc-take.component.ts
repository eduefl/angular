import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit } from '@angular/core';

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
export class PocTakeComponent implements OnInit {
  nome = 'Componente com take';
  valor: string ;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
  }

}
