import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poc-async',
  template: `
  <app-poc-base
    [nome] = "nome"
    [valor] = "valor"
    estilo = "bg-success"
  >
  </app-poc-base>
`,
  styles: []
})
export class PocAsyncComponent implements OnInit {
  nome = 'Componente com async';
  valor: string ;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
  }

}
