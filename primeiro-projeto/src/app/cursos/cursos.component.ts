import {CursosService } from './cursos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  nomePortal: string;  

  lista: string[]; 
  
  constructor(private cusrsosService: CursosService) {
    this.nomePortal = 'https://loiane.training/'
    
    //var servico = new CursosService();
    this.lista = this.cusrsosService.getCursos();
   }

  ngOnInit(): void {
  }

}
