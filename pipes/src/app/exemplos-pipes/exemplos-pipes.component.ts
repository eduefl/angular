import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any={

    titulo: 'O Senhor dos Anéis: A Sociedade do Anel (Volume 1)',
    rating: 4.74524,
    numeroPaginas: 450 , 
    preco: 29, 
    dataLancamento: new Date(2000, 0 , 1), 
    url: 'https://www.amazon.com.br/Sociedade-Anel-S%C3%A9rie-Senhor-An%C3%A9is/dp/8533613377'
  };
  livros: string[] = ['java', 'vb6', 'advpl' ];

  filtro: string;
  addCusro(valor){
    this.livros.push(valor); 


  }


  obterCursos(){
    if (this.livros.length === 0 || this.filtro=== undefined || this.filtro.trim()=== '' ){
      return this.livros;      
    }
    return this.livros.filter((v) => {
     if (v.toLocaleLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ) {
        return true;
      }
        return false;

    });

  }

  valorAsync = new Promise((resolve,reject) =>{
    setTimeout(()=>resolve('valor assincrono'),2000);
  });

  valorAsync2 = Observable.interval(3000)
    .map(valor => 'valor assincrono 2 '); 
  constructor() { }

  ngOnInit() {
  }

}
