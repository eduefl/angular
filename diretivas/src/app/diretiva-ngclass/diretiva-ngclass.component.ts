import { Component, OnInit } from '@angular/core';
//https://getbootstrap.com/docs/3.3/
@Component({
  selector: 'app-diretiva-ngclass',
  templateUrl: './diretiva-ngclass.component.html',
  styleUrls: ['./diretiva-ngclass.component.scss']
})
export class DiretivaNgclassComponent implements OnInit {

  meuFavorito: boolean = false; 

  constructor() { }

  onClick(){
    this.meuFavorito = !this.meuFavorito;



  }
  ngOnInit() {
  }

}
