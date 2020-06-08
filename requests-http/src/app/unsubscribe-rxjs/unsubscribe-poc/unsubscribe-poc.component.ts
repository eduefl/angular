import { EnviarValorService } from './../enviar-valor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unsubscribe-poc',
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: ['./unsubscribe-poc.component.scss']
})
export class UnsubscribePocComponent implements OnInit {
  nameButton  = 'Destruir Componentes';
  classbtn = 'btn btn-outline-dark';

  mostrarComponentes = true;
  constructor(private service: EnviarValorService) { }

  ngOnInit() {
  }

  emitirValor(valor: string) {
    this.service.emitirValor(valor);

  }
  destruir() {
    this.mostrarComponentes = !this.mostrarComponentes;
    if (this.mostrarComponentes)    {
      this.nameButton  = 'Destruir Componentes';
      this.classbtn = 'btn btn-outline-dark';
    } else {
      this.nameButton  = 'Mostrar Componentes';
      this.classbtn = 'btn btn-outline-warning';

    }



  }

}
