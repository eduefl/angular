import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit } from '@angular/core';

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
export class PocTakeUntilComponent implements OnInit {
  nome = 'Componente com take until';
  valor: string ;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
  }

}
