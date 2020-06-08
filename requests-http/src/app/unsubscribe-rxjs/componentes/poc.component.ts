import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit } from '@angular/core';

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
export class PocComponent implements OnInit {
  nome = 'componente sem unsubscrible';
  valor: string ;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
  }

}
